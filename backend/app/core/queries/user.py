"""
will return all the CRUD operations
"""
from fastapi import HTTPException, status

from sqlalchemy import text, update, select
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Optional

from ...utils.hash_pass import get_hashed_password
from ..exc.exceptions import UserAlreadyExistsException, FieldNotFilledException
from ..models.users import User
from ..schemas.user import UsersCreate


async def get_user(username:Optional[str], session:AsyncSession):
    """Will return a user by its credentials"""
    get_user = select(User).where(User.username == username)
    result = await session.scalars(get_user)
    user = result.first()
    if user==None:
        raise FieldNotFilledException
    return user
    
async def create_user(session:AsyncSession, user:UsersCreate):
    """will create a new user"""
    # fetch_user = await get_user(session, user.username)
    # if fetch_user.username==user.username: # type: ignore
    #     raise UserAlreadyExistsException
    new_entry = User(FullName=user.FullName, email=user.email, username=user.username)
    new_entry.password = user.password
    session.add(new_entry)
    await session.commit()
    await session.refresh(new_entry)
    return new_entry

async def update_user(session:AsyncSession, fullname:Optional[str]=None, email:Optional[str]=None, username:Optional[str]=None ,password:Optional[str]=None):
    """will update the user details"""
    update_user = update(User).where(User.username==username)
    fetch_user = await get_user(username,session)
    # if fetch_user.username==username:
    #     raise UserAlreadyExistsException
    
    if not fullname==None:
        update_user.FullName = fullname # type: ignore
    if not email==None:    
        update_user.email = email # type: ignore
    if not username==None:
        update_user.username = username # type: ignore    
    if not password==None:
        update_user.password = password # type: ignore
    await session.commit()
    await session.refresh(update_user)
    return update_user

