from fastapi import HTTPException
from starlette.status import HTTP_401_UNAUTHORIZED, HTTP_406_NOT_ACCEPTABLE

class InvalidCredentialsException(HTTPException):
    def __init__(self, detail:str|None=None):
        self.detail = detail
        if self.detail == None:
            super().__init__(HTTP_401_UNAUTHORIZED, "Couldn't validate credentials", {"WWW-Authenticate": "Bearer"})
        else:
            super().__init__(HTTP_401_UNAUTHORIZED, f"{self.detail}", {"WWW-Authenticate": "Bearer"})
            
class UserAlreadyExistsException(HTTPException):
    def __init__(self):
        super().__init__(HTTP_406_NOT_ACCEPTABLE, "User already exists. Please try with a different username.")
        
class FieldNotFilledException(HTTPException):
    def __init__(self):
        super().__init__(401, "Either username or password is empty.")