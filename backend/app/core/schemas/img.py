from fastapi import Form, File, UploadFile
from pydantic import BaseModel

class ImageBase(BaseModel):
    filename:str
    file:bytes
    
    
