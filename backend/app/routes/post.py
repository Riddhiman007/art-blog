"""All routings of posts are created here"""
from fastapi import APIRouter, Depends, Request, UploadFile, File
from fastapi.responses import HTMLResponse, FileResponse, Response
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from starlette.routing import Mount
from sqlalchemy.ext.asyncio import AsyncSession
import os
from markupsafe import Markup
from typing import Optional
# self imports
from ..core.schemas.post import Posts
from ..core.models.posts import Post
from ..utils.dependency import get_session
from ..core.queries.post import creates_new_blog
from ..utils.dependency import get_session, params
from ..core.repos.users import get_current_user

router = APIRouter(prefix='/post', tags=["posts"] ,routes=[Mount("/static", app=StaticFiles(directory="static"), name="static")])
templates = Jinja2Templates(directory="templates")


@router.post("/create")
async def create_blog(upload:UploadFile=File(...), post:Posts = Depends(Posts.as_form), session: AsyncSession = Depends(get_session)):
    content = None
    if not upload==None:
        content = await upload.read()
        with open(f'dynamic/{upload.filename}', 'xb') as f:
            f.write(content)
            f.close()
    entry = await creates_new_blog(img=content, session=session, request=post)
    response = HTMLResponse(entry.content, status_code=200)
    # return entry.content
    return {'sucess':'sucess'}

@router.get('/create')
async def create_post_page(request:Request):
    return templates.TemplateResponse('create_post.html',{'request':request, 'params':params})
        
        