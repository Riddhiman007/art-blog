from sqlalchemy import func, Text, ForeignKey, Integer
from sqlalchemy.dialects.mysql import LONGBLOB
from sqlalchemy.orm import relationship, mapped_column, Mapped

from ..base.base import Base

from datetime import date
 # model for making tables

class Post(Base): 
    """Blog table"""
    __tablename__ = "posts"
    id:Mapped[int] = mapped_column(primary_key=True, autoincrement="ignore_fk")
    title:Mapped[str] = mapped_column(Text)
    sub_title:Mapped[str|None] = mapped_column(Text,nullable=True)
    content:Mapped[str] = mapped_column(Text)
    img:Mapped[bytes] = mapped_column(nullable=True)
    slug:Mapped[str] = mapped_column(Text)
    creation_time:Mapped[date] = mapped_column(default=func.now())
    author_id:Mapped[int] = mapped_column(Integer, ForeignKey('users.id'))
    author = relationship('User',back_populates='posts')
    
    