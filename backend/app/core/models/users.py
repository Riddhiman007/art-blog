from sqlalchemy import Text
from sqlalchemy.dialects.mysql import INTEGER
from sqlalchemy.orm import relationship, mapped_column, Mapped
from ..base.base import Base
from ...utils.hash_pass import get_hashed_password, verify_password


class User(Base):
    __tablename__ = "users"
    id:Mapped[int] = mapped_column(primary_key=True, autoincrement='ignore_fk')
    FullName:Mapped[str] = mapped_column(Text)
    username:Mapped[str] = mapped_column(Text)
    # contact = Column(INTEGER)
    email:Mapped[str] = mapped_column(Text)
    password_hash:Mapped[str] = mapped_column(Text)
    posts = relationship('Post',back_populates='author', lazy="selectin")
    
    @property
    def password(self):
        raise AttributeError("Password is not a readable object.")
    
    @password.setter
    def password(self, password):
        self.password_hash = get_hashed_password(password)
        
    # def verify(self, password):
    #     return verify_password(password, self.password_hash)
