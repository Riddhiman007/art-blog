
from sqlalchemy import select
from sqlalchemy.orm import aliased
from sqlalchemy.ext.asyncio import AsyncSession
from ..models.posts import Post
from ..schemas.post import Posts

async def creates_new_blog(img:bytes|None, session:AsyncSession , request:Posts):
    new_entry = Post(**request.dict())
    if img:
        new_entry = Post(img=img, **request.dict())
    session.add(new_entry)
    await session.commit()
    await session.refresh(new_entry)
    return new_entry

    
async def get_blog_by_id(session:AsyncSession, id):
    stmt = select(Post).where(Post.id==id)
    result = await session.scalars(stmt)
    record = result.first() 
    print(record)
    return record

async def get_blog(session: AsyncSession):
    """WIll generate all posts"""
    stmt = select(Post)
    result = await session.scalars(stmt)
    records = result.fetchall()
    return records