from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import HTTPException, Depends, status, Request
from fastapi.security.oauth2 import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from datetime import timedelta
from jose import jwt, JWTError
import sys


from ..models.users import User
from ..queries.user import get_user
from ..schemas.user import UsersCreate
from ...utils.token import create_access_token, verify_token
from ...utils.hash_pass import verify_password, get_hashed_password

oauth2_scheme = OAuth2PasswordBearer("user/login")

async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    return verify_token(token, credentials_exception)


        