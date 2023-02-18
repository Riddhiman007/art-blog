from sqlalchemy.orm import Session
from .model import Posts
from .schemas import PostCreate


"""CRUD stands for Create, Read, Update, Delete"""
def get_posts(db:Session, skip:int=0, limit:int=100):
    """will return a list of posts"""
    return db.query(Posts).offset(skip).limit(limit).all()

def create_post(db:Session, post:PostCreate):
    post_model = Posts(title=post.title, sub_title=post.sub_title, content=post.content, slug=post.slug, author=post.author)
    db.add(post_model)
    db.commit()
    db.refresh(post_model)

