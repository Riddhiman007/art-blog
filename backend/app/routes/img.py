from fastapi import APIRouter, Depends, UploadFile, File
from fastapi.responses import ORJSONResponse, Response
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from datetime import datetime
import io

# relative imports
from ..core.auth.authorize import get_current_user
from ..core.models.images import ImageModel
from ..core.models.users import User
from ..utils.dependency import get_session

router = APIRouter(prefix="/images", default=ORJSONResponse, tags=['images'])

@router.post("/upload")
async def upload(image:UploadFile=File(...), session:AsyncSession=Depends(get_session), user:User=Depends(get_current_user)):
    file = await image.read()
    filename = f"{user.username}-{datetime.now().strftime('%Y-%M-%D_%H:%m:%S')}-{image.filename}"
    entry = ImageModel(filename=filename, file=file, file_type=image.content_type)
    session.add(entry)
    await session.commit()
    await session.refresh(entry)
    return {"url": f"http://127.0.0.1:8000/images/{filename}"}

@router.get('/{filename}')
async def image(filename:str, session:AsyncSession=Depends(get_session)):
    query = select(ImageModel).where(ImageModel.filename == filename)
    res = await session.scalars(query)
    image = res.first()
    img = io.BytesIO(image.file)
    content = img.read()
    return Response(content, media_type=image.file_type)
    
    