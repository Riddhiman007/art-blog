from pydantic import BaseModel

from fastapi import UploadFile, Form, File

class Posts(BaseModel):
    title: str
    sub_title: str|None
    content: str
    slug: str
    
    @classmethod
    def as_form(
        cls, 
        title = Form(...),
        sub_title = Form(...),
        content = Form(...),
    ):
        return cls(title=title, sub_title=sub_title, content=content, slug='slug')