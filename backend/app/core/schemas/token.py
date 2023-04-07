from pydantic import BaseModel
from typing import Optional
from .user import UsersBase

class TokenResponse(UsersBase):
    access_token:str
    token_type:str



class TokenData(BaseModel):
    username: Optional[str] = None
