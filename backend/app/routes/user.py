from datetime import timedelta
from fastapi import APIRouter, Depends, Request, Form, status, Response, HTTPException
from fastapi.responses import ORJSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy import text, update
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import IntegrityError
from starlette.routing import Mount
import time

from ..core.auth.authorize import verify_user, get_current_user
from ..core.auth.jwt_handler import encodeJWT, token_response
from ..core.schemas.user import Users, UsersCreate, Login
from ..core.schemas.token import TokenResponse
from ..core.models.users import User
from ..core.exc.exceptions import InvalidCredentialsException
from ..utils.hash_pass import get_hashed_password, verify_password
from ..utils.dependency import get_session, params
from ..utils.token import create_access_token
from ..core.queries.user import create_user, get_user
from ..utils.dependency import characters, numbers, symbols, small

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
async def me(user:User=Depends(get_current_user)):
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
        try:
            access_token = encodeJWT(user.username)
            print("logged in successfully")
        except Exception as e:
            print(e)
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials. Please check your credentials or sign up for your account.")
        else:
            return token_response(access_token)
    else:
        raise HTTPException(status.HTTP_404_NOT_FOUND, detail="Invalid username or password")
             
    
@router.post('/login', response_model=TokenResponse)
async def sign_in(user_details:OAuth2PasswordRequestForm=Depends(), session:AsyncSession=Depends(get_session)):
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
        try:
            access_token = encodeJWT(user.username)
            print("logged in successfully")
        except Exception as e:
            print(e)
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials. Please check your credentials or sign up for your account.")
        else: 
            res = TokenResponse(FullName=user.FullName, email=user.email, username=user.username, access_token=access_token, token_type="bearer")
            print(res)
            return res
    else:
        raise HTTPException(status.HTTP_404_NOT_FOUND, detail="Invalid username or password")
             