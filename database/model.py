from sqlalchemy import Column, Integer, VARCHAR, DateTime, String
from datetime import datetime
from .database import Base

currtime = datetime.now().strftime("%Y-%m-%d %H:%M")
class Posts(Base):
    __tablename__ = 'posts'
    id = Column(Integer, primary_key=True, nullable=False, index=True)
    title = Column(String(40), nullable=False)
    sub_title = Column(String(40), nullable=False)
    content = Column(String(40), nullable=False)
    slug = Column(String(40), nullable=False)
    author = Column(String(40), nullable=False)
    date = Column(DateTime(), default=currtime, nullable=False)
