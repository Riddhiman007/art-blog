from pydantic import BaseModel
from fastapi import UploadFile, Form, File
from .user import Users


class PostBase(BaseModel):
    title: str
    sub_title: str|None
    content: str
    slug: str
    
class PostCreate(PostBase):
    pass
    @classmethod
    def as_form(
        cls, 
        title = Form(...),
        sub_title = Form(...),
        content = Form(...),
    
    ):
        return cls(title=title, sub_title=sub_title, content=content, slug='slug')
    
class Posts(PostBase):
    id:int
    author_id:int
    author:Users
    
    class Config:
      orm_mode=True