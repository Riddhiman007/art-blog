from fastapi import FastAPI, Request, Depends, status
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from sqlalchemy.ext.asyncio import AsyncSession
from starlette.routing import Mount, Route
from starlette.middleware.cors import CORSMiddleware
import uvicorn
from typing import Optional

# self imports 
from .app.utils.dependency import params, get_session
from .app.routes import post, user
from .app.core.base.base import init_db, close_db
from .app.core.queries.post import get_blog_by_id, get_blog
from .app.core.errors.errors import err
from .app.core.auth.authorize import get_current_user

app = FastAPI(routes=[Mount("/static", StaticFiles(directory="static"), name="static"),Route('/error', err)],)
app.include_router(user.router)
app.include_router(post.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.mount('/errors', err) 
app.title = "Art Blog"
app.description = """## User:
User route. Contains all functions of the user.

## Post:
Post route. Contains all functions of the post"""


templates = Jinja2Templates(directory="templates")

@app.on_event("startup")
async def startup():
    await init_db()
    
@app.on_event("shutdown")
async def shutdown():
    await close_db()    

@app.get("/", tags=["default"])
async def index(request: Request, msg:Optional[str]=None):
    """Home template"""
    return templates.TemplateResponse("index.html", {"request": request, "params": params, "msg": msg})

@app.post("/", tags=["default"])
async def index_method_post(request: Request, msg:str):
    """Home template"""
    return templates.TemplateResponse("index.html", {"request": request, "params": params, "msg": msg})

@app.get("/post")
async def posts(request: Request):
    """blog template"""
    return templates.TemplateResponse(
        "post.html", {"request": request, "params": params}
    )


@app.get("/courses")
async def courses(request: Request):
    """Course template"""
    return templates.TemplateResponse(
        "contact.html", {"request": request, "params": params}
    )


@app.get("/info")
async def info(request: Request):
    """info template"""
    return templates.TemplateResponse(
        "info.html", {"request": request, "params": params}
    )


@app.get("/post/{id}")
async def get_blogs_by_id(id: int, request:Request, session: AsyncSession = Depends(get_current_user)):
    get_blog = get_blog_by_id(id=id, session=session)
    return templates.TemplateResponse("post_preview.html", {"request": request, "post": get_blog, "params": params})

@app.get("/about")
async def about(request: Request):
    return templates.TemplateResponse("about.html", {"request": request, "params": params})

@app.get('/swagger')
async def swagger(request: Request):
    return templates.TemplateResponse("swagger.html", {"request": request})