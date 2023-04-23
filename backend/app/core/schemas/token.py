from datetime import datetime
from pydantic import BaseModel
from typing import Optional
from .user import UsersBase

class TokenResponse(UsersBase):
    access_token:str
    refresh_token:str|None
    refresh_exp:datetime|None
    expire_time:datetime|None
    token_type:str



class TokenData(BaseModel):
    username: Optional[str] = None
