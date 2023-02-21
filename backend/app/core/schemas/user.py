from pydantic import BaseModel
from fastapi import Form

from ...utils.hash_pass import get_hashed_password
from ...utils.dependency import slugify

class UsersBase(BaseModel):
    FullName: str
    username: str
    email: str

class UsersCreate(UsersBase):
    slug: str|None
    password: str
    @classmethod
    def as_form(cls, fullname=Form(..., media_type="multipart/form-data"), username=Form(...), email=Form(...), password=Form(...)):
        hashed_pass = get_hashed_password(password)
        slug = slugify(f"User:{fullname}")
        return cls(FullName=fullname, username=username, email=email, slug='slug' ,password=password)

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