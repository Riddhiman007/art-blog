from typing import List, Union
from pydantic import BaseModel
from datetime import datetime

class PostBase(BaseModel):
    title: str
    sub_title: str
    content: str

class PostCreate(PostBase):
    slug: str
    author: str

class Post(PostBase):
    id: int
    date: str
    class Config:
        orm_mode = True