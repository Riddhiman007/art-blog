from pydantic import BaseModel
from typing import Optional

class Token(BaseModel):
    id:int
    name:str
    username:str
    email:str
    access_token: str
    token_type: str 

class TokenData(BaseModel):
    username: Optional[str] = None
