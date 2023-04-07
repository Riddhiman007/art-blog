from sqlalchemy import Text
from sqlalchemy.dialects.mysql import BLOB
from sqlalchemy.orm import Mapped, mapped_column

# relative imports
from ..base.base import Base

class ImageModel(Base):
    __tablename__ = 'image'
    id:Mapped[int] = mapped_column(primary_key=True, autoincrement='auto')
    filename:Mapped[str] = mapped_column(Text)
    file_type:Mapped[str] = mapped_column(Text)
    file = mapped_column(BLOB)