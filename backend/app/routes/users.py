from ..core.auth.authorize import verify_user, get_current_user
from ..core.auth.jwt_handler import encodeJWT, token_response, decodeJWT
from ..core.exc.exceptions import InvalidCredentialsException
from ..core.models.users import User
from ..core.mongo.crud.users import add_user
from ..core.mongo.schemas.users import CreateUser
from ..core.queries.user import create_user, get_user
from ..core.schemas.token import TokenResponse
from ..core.schemas.user import Users, UsersCreate, Login
from ..utils.dependency import characters, numbers, symbols, small
from ..utils.dependency import get_session, params
from ..utils.hash_pass import get_hashed_password, verify_password
from ..utils.token import create_access_token

from datetime import datetime, timedelta
from decouple import config
from fastapi import APIRouter, Depends, Request, Form, status, Response, HTTPException, status, Body
from fastapi.encoders import jsonable_encoder
from fastapi.responses import ORJSONResponse
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi_jwt_auth import AuthJWT
from jose.exceptions import ExpiredSignatureError
from pydantic import BaseModel
from sqlalchemy import text, update, select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession
from starlette.routing import Mount
from typing import Annotated
import time

# all login settings 
# secret_key:str = config('SECRET')

class Settings(BaseModel):
    authjwt_secret_key:str = '1336fc7630dcfd95d331c0ce7ea71cafa7f05b1b26e8fa51d277fa2d115bda278900e836b030e6595ede6cf68ec875749309b58209cfcac42629319eb79dd19127b82c2272fd698125565ed18afb2563'
    authjwt_cookie_domain:str = "http://127.0.0.1:8000"
    authjwt_token_location:set={'headers', 'cookies'}
    
# callback config
@AuthJWT.load_config
def get_config():
    return Settings()


router = APIRouter(tags=["authorisation"], prefix="/user",
        routes=[Mount("/static", app=StaticFiles(directory="static"), name="static")], default_response_class=ORJSONResponse)

templates = Jinja2Templates(directory="templates")

@router.get("/sign_up")
async def render_sign_up_template(request:Request):
    return templates.TemplateResponse("sign_up.html", {"request": request, "params": params})

@router.post("/register", response_model=Users, response_class=ORJSONResponse)
async def sign_up(user:UsersCreate=Depends(UsersCreate.as_form),  session: AsyncSession = Depends(get_session)):
    start = time.time()
    errors = []
    success = True
    if success==True:
        try:
            new_user = await create_user(session, user)
            return new_user
        except Exception:
            errors.append("There is already a registered username. Please try with a different username.")
            return {"error": errors}
        finally:
            end = time.time()
            print("Current time", end - start)
    # else:
    #     return templates.TemplateResponse("sign_up.html", {"request": request, "params": params, "errors":errors}, status_code=status.HTTP_406_NOT_ACCEPTABLE)

@router.get("/login", response_class=ORJSONResponse)
async def login(request:Request):
    return templates.TemplateResponse("login.html", {"request": request, "params": params})

@router.get('/login/me', response_model=Users, response_class=ORJSONResponse)
async def me(Authorize:AuthJWT=Depends(), session:AsyncSession=Depends(get_session)):#, user:User=Depends(get_current_user)):#(Authorize:AuthJWT=Depends(),
    Authorize.jwt_required()
    sub = Authorize.get_jwt_subject()
    query = select(User).where(User.username == sub)
    result = await session.scalars(query)
    user = result.first()
    return user
    
@router.post("/login/token")
async def login_for_access_token(user_details:OAuth2PasswordRequestForm=Depends(),session: AsyncSession=Depends(get_session)):
    user = await get_user(user_details.username, session)
    password = user.password_hash
    if type(password)==HTTPException:
        raise InvalidCredentialsException
    login:bool = False
    if user:
        if verify_password(user_details.password, password):
            login = True
        else:
            login = False
            raise HTTPException(404, 'invalid password')
    else:
        login = False
        raise HTTPException(404, 'invalid username')
  
    if login==True:
        exp = datetime.now() + timedelta(minutes=15)
        try:
            access_token = encodeJWT({"sub":user.username},exp)
            print("logged in successfully")
        except Exception as e:
            print(e)
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials. Please check your credentials or sign up for your account.")
        else:
            return token_response(access_token)
    else:
        raise HTTPException(status.HTTP_404_NOT_FOUND, detail="Invalid username or password")
             
    
@router.post('/login', response_model=TokenResponse)
async def sign_in(user_details:OAuth2PasswordRequestForm=Depends(), Authorize:AuthJWT=Depends(), session:AsyncSession=Depends(get_session)):#, 
    """Not so strong"""
    user = await get_user(user_details.username, session)
    
    password = user.password_hash
    if type(password)==HTTPException:
        raise InvalidCredentialsException
    login:bool = False
    if user:
        if verify_password(user_details.password, password):
            login = True
        else:
            login = False
            raise HTTPException(404, 'invalid password')
    else:
        login = False
        raise HTTPException(404, 'invalid username')
  
    if login==True:
        exp = datetime.now()+timedelta(minutes=15)
        refresh_exp = datetime.now() + timedelta(minutes=60*24*60)
        try:
            access_token = Authorize.create_access_token(user.username, expires_time=timedelta(minutes=30))
            refresh_token = Authorize.create_refresh_token(user.username, expires_time=timedelta(minutes=60*24*60))
            # access_token = encodeJWT({'sub':user.username})
            print("logged in successfully")
        except Exception as e:
            print(e)
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials. Please check your credentials or sign up for your account.")
        else: 
            res = TokenResponse(FullName=user.FullName, email=user.email, username=user.username, access_token=access_token, refresh_token=refresh_token, refresh_exp=refresh_exp,expire_time=exp,token_type="bearer")
            resp = ORJSONResponse(res.json())
            resp.set_cookie('refresh_token',f'Bearer {refresh_token}', httponly=True)
            print(res)
            return res
    else:
        raise HTTPException(status.HTTP_404_NOT_FOUND, detail="Invalid username or password")
             
@router.post('/login/refresh', response_class=ORJSONResponse)
async def refresh_token(Authorize:AuthJWT=Depends(), session:AsyncSession=Depends(get_session)):
    """Under development"""
    Authorize.jwt_refresh_token_required()
    username = Authorize.get_jwt_subject()
    user = await get_user(username, session)
    if user:
        exp = datetime.now()+timedelta(minutes=30)
        refresh_exp = datetime.now()+timedelta(days=60)
        access_token = Authorize.create_access_token(user.username, expires_time=timedelta(minutes=15))
        refresh_token = Authorize.create_refresh_token(user.username, expires_time=timedelta(days=60))
    else: raise HTTPException(status.HTTP_404_NOT_FOUND, 'user not found')
    res = TokenResponse(FullName=user.FullName, email=user.email, username=user.username, access_token=access_token, refresh_exp=refresh_exp,refresh_token= refresh_token,expire_time=exp, token_type="bearer")
    return res
    