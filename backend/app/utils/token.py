from jose import JWTError, jwt
from fastapi import status, HTTPException
from datetime import timedelta, datetime

from ..core.schemas.token import TokenData
# to get a string like this run:
# openssl rand -hex 32
SECRET_KEY = "5876aeb2aa87aafd565b8c6627004e286ca92409a00a68c25b2ae3df24868c80382e2ea542fddaf2042ce493094d97e3bc069ef1d7e77326623e6339"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30


def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_token(token, credentials_exception: HTTPException):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception