from pydantic import BaseModel, Field
from fastapi import Form

from ...utils.hash_pass import get_hashed_password
from ...utils.dependency import slugify


class UsersBase(BaseModel):
    FullName: str
    username: str
    email: str

class UsersCreate(UsersBase):
    password: str
    @classmethod
    def as_form(cls, 
                fullname:str=Form(...), 
                username:str=Form(...), 
                email:str=Form(...),
                password:str=Form(..., min_length=6, regex="^[a-zA-Z0-9]")):
        return cls(FullName=fullname, username=username, email=email ,password=password)

class Users(UsersBase):
    id: int
    class Config:
        orm_mode = True

class Login(BaseModel):
    username: str
    password: str
    
    @classmethod
    def as_form(cls, username:str=Form(...), password:str=Form(...)):
        return cls(username=username, password=password)