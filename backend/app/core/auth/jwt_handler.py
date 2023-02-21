from decouple import config
from datetime import datetime, timedelta
from jose import jwt

jwt_secret:str = config('SECRET_KEY') # type: ignore
algorithm:str = config('ALGORITHM') # type: ignore

def token_response(token):
    """Function returns the generated token (JWT)"""
    return {'access_token': token, 'token_type': 'bearer'}

def encodeJWT(username):
    data = {"sub": username}
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=30)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, jwt_secret, algorithm=algorithm)
    return encoded_jwt

def decodeJWT(token:str):
    try:
        decode_token = jwt.decode(token, jwt_secret, [algorithm])
        return decode_token if decode_token['exp'] >= datetime.utcnow() else 'Login Expired' 
    except Exception as e:
        print(e)
        
def verify_token(access_token):
    # token = access_token.get('access_token')
    payload = decodeJWT(str(access_token))
    if payload:
        return payload