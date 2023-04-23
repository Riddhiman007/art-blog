
from sqlalchemy import select
from sqlalchemy.orm import aliased
from sqlalchemy.ext.asyncio import AsyncSession
from ..models.posts import Post
from ..schemas.post import Posts, PostCreate

async def creates_new_blog( session:AsyncSession , request:PostCreate, author_id:int):
    new_entry = Post(**request.dict(), author_id=author_id)
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

async def get_all_blogs(session: AsyncSession):
    """WIll generate all posts"""
    stmt = select(Post).order_by(Post.id.desc())
    result = await session.scalars(stmt)
    records = result.fetchall()
    return records

async def fetch_latest_posts(session:AsyncSession):
    """returns a list of posts
    :param session: :class:`AsyncSession`
    """
    query = select(Post).order_by(Post.id.desc())
    result = await session.scalars(query)
    posts = result.fetchmany(15)
    return posts