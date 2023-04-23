"""configuration and routes for particular user"""
from datetime import date
from fastapi import APIRouter, Depends
from fastapi.responses import ORJSONResponse
from sqlalchemy import select
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession

# self imports
from ..core.schemas.user import UsersBase, Users
from ..core.schemas.post import PostBase, Posts
from ..core.models.posts import Post
from ..core.models.users import User
from ..utils.dependency import get_session

class ViewPost(BaseModel):
    id:int
    title: str
    sub_title: str|None
    content: str
    slug: str
    author:Users
    author_id:int
    creation_time: date
    class Config:
      orm_mode=True
    
# class Users(UsersBase):
#     """All available items of user"""
    #  id:int
#     posts:list[ViewPost]
#     class Config:
#         orm_mode=True
    
router = APIRouter(tags=["Each user"], default_response_class=ORJSONResponse)

@router.get("/{username}/{slug}", response_model=Posts)
async def fetch_post(username:str, slug:str, session:AsyncSession=Depends(get_session)):    
    query = select(Post).where(Post.slug==slug).join(User, User.username == username)
    record = await session.scalars(query)
    post = record.first()
    # res:dict[str, int|str|None|Users] = post
    return post