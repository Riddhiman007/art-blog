"""All routings of posts are created here"""
from fastapi import APIRouter, Depends, Request, UploadFile, File
from fastapi.responses import HTMLResponse, ORJSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from starlette.routing import Mount
from sqlalchemy.ext.asyncio import AsyncSession
import os
from markupsafe import Markup
from typing import Optional
# self imports
from ..core.schemas.post import Posts, PostCreate
from ..core.models.users import User
from ..core.models.posts import Post
from ..core.queries.post import creates_new_blog
from ..utils.dependency import get_session, params
from ..core.auth.authorize import get_current_user

router = APIRouter(prefix='/post', tags=["posts"] ,routes=[Mount("/static", app=StaticFiles(directory="static"), name="static")], default_response_class=ORJSONResponse)
templates = Jinja2Templates(directory="templates")


@router.post("/create", response_model=Posts, response_class=ORJSONResponse)
async def create_blog(user:User=Depends(get_current_user), post:PostCreate = Depends(PostCreate), session: AsyncSession = Depends(get_session)):
   
        # with open(f'dynamic/{upload.filename}', 'xb') as f:
        #     f.write(content)
        #     f.close()
    entry = await creates_new_blog( session=session, request=post, author_id=user.id)
    response = HTMLResponse(entry.content, status_code=200)
    # return entry.content
    return entry

@router.get('/create')
async def create_post_page(request:Request):
    return templates.TemplateResponse('create_post.html',{'request':request, 'params':params})
        
        