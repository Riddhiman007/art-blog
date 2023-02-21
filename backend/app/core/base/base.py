from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker
from sqlalchemy.orm import DeclarativeBase

ASYNC_DATABASE_URI = "mysql+aiomysql://NortonEdgar:kgjskl007!@localhost/common_db"

engine =  create_async_engine(ASYNC_DATABASE_URI, echo=True)

async_session = async_sessionmaker(engine, expire_on_commit=False)

class Base(DeclarativeBase):
    pass

async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all) 
        await conn.run_sync(Base.metadata.create_all) 
        
async def close_db():
    await engine.dispose()
        