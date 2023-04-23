from datetime import date
from pydantic import BaseModel
from fastapi import Form


from .user import Users
from ...utils.dependency import slugify
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
        sub_title = Form(None),
        content = Form(...),
    
    ):
        slug = slugify(title)
        return cls(title=title, sub_title=sub_title, content=content, slug=slug)
    
class Posts(PostBase):
    id:int
    author_id:int
    author:Users
    creation_time:date
    class Config:
      orm_mode=True