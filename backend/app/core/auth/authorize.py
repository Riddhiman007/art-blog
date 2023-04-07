from fastapi import Depends, Request, HTTPException
from fastapi.openapi.models import OAuthFlows as OAuthFlowsModel
from fastapi.security import OAuth2, OAuth2PasswordRequestForm, OAuth2PasswordBearer
from fastapi.security.utils import get_authorization_scheme_param
from sqlalchemy.ext.asyncio import AsyncSession
from starlette.status import HTTP_401_UNAUTHORIZED
from typing import Optional, Dict

from .jwt_handler import jwt, jwt_secret, algorithm
from ..exc.exceptions import InvalidCredentialsException
from ...utils.dependency import get_session
from ..schemas.user import Login
from ..queries.user import get_user
from ...utils.hash_pass import verify_password

oauth2_scheme = OAuth2PasswordBearer('/user/login')

async def get_current_user(token:str=Depends(oauth2_scheme), session:AsyncSession=Depends(get_session)):
    payload = jwt.decode(token, jwt_secret, [algorithm]) # type:ignore
    username = payload.get('sub')
    current_user = await get_user(session=session, username=username)
    return current_user

async def verify_user(session:AsyncSession, user_schema:OAuth2PasswordRequestForm):
    user = await get_user(user_schema.username, session)
    if user:
        password = user.password
        if verify_password(user_schema.password, str(password)):
            return True
        else:
            raise InvalidCredentialsException
    else:
        raise InvalidCredentialsException
    