from decouple import config
from datetime import datetime, timedelta
from jose import jwt, JWTError
from jose.exceptions import ExpiredSignatureError

from fastapi import HTTPException
from starlette.status import HTTP_403_FORBIDDEN
jwt_secret:str = config('SECRET_KEY') # type: ignore
algorithm:str = config('ALGORITHM') # type: ignore
refresh_key:str = config('REFRESH_KEY') # type: ignore

def token_response(token):
    """Function returns the generated token (JWT)"""
    return {'access_token': token, 'token_type': 'bearer'}

def encodeJWT(data:dict[str, str]):#, exp:datetime, token_type:str):
    to_encode = data.copy()
    # if type(exp)==timedelta:
    #     expire = datetime.utcnow() + timedelta(minutes=30)
    # to_encode.update({"exp": exp})
    encoded_jwt = jwt.encode(to_encode, jwt_secret, algorithm=algorithm)
    # if token_type=="refresh":
    #     encoded_jwt = jwt.encode(to_encode, refresh_key, algorithm)
    return encoded_jwt

def decodeJWT(token:str):#, token_type:str):
    try:
        decode_token = jwt.decode(token, jwt_secret, algorithm)
    except ExpiredSignatureError:
        raise HTTPException(HTTP_403_FORBIDDEN, "Token expired")
    except Exception as e:
        print(e)
    else:
        return decode_token # if decode_token['exp'] >= datetime.utcnow() else 'Login Expired' 
        
def verify_token(access_token):
    # token = access_token.get('access_token')
    payload = decodeJWT(str(access_token))
    if payload:
        return payload