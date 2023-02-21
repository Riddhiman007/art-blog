from json import load
from fastapi import HTTPException, status

from ..core.base.base import async_session
with open("backend/app/utils/config.json", "r") as jsonfile:
    params = load(jsonfile)["params"]


mysql_uri = "mysql:///root:@localhost/common_db",
mysql_async_uri ="mysql+asyncmy://root@localhost/common_db",
sqlite_uri = "sqlite:///./databases/database.db",
sqlite_async_uri ="sqlite+aiosqlite:///./databases/database.db"
    
symbols:str = "~`!@#$%^&*()_+=\\|{}:<>?[];',./"

numbers:str = "1234567890"

characters:str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" # ABCDEFGHIJKLMNOPQRSTUVWXYZ"

small = characters.lower()

async def get_session():
    async with async_session() as session:
        try:
            yield session
        except Exception as e:
            print(e)
            await session.rollback()
        finally:
            await session.close()

def slugify(txt:str):
    for each_symbol in symbols:
        if each_symbol in txt:
            text = txt.replace(each_symbol, "")
            text = text.lower()
            text = text.replace(" ", "-")
            return text

def verify_slug(slug:str)->str:
    slg = slug.replace("-", " ")
    slg = slug.capitalize()
    return slg
            