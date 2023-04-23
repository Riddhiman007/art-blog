from bson import ObjectId
from fastapi import Form
from pydantic import BaseModel, Field

from ..base import PyObjectId
from ...schemas.user import UsersCreate
from ....utils.hash_pass import get_hashed_password

class CreateUser(BaseModel):
    # id:PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    FullName:str = Field(...)
    username:str = Field(...)
    email:str = Field(...)
    password:str = Field(...)
    
    @classmethod
    def as_form(cls, FullName:str=Form(...), username:str=Form(...),email:str=Form(...), password:str=Form(...)):
        password_hash = get_hashed_password(password)
        return cls(FullName=FullName, username=username, email=email, password=password_hash)
    
    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "FullName": "Jane Doe",
                "username": "Jane007",
                "email": "jdoe@example.com",
                "password": "******"
            }
        }