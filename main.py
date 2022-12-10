from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import json

app = FastAPI()

with open("utils/config.json", "r") as config:
    params = json.load(config)["params"]

app.mount("/static", StaticFiles(directory="static"), name="static")

templates = Jinja2Templates(directory="templates")

@app.get("/")
async def read_item(request: Request):
    return templates.TemplateResponse("index.html", {"request": request, "params":params})

@app.post("/posts")
async def post(request: Request):
    return templates.TemplateResponse("posts.html", {"request": request, "params":params})

@app.post("/courses")
async def courses(request: Request):
    return templates.TemplateResponse("course.html", {"request": request, "params":params})

@app.post("/info")
async def info(request: Request):
    return templates.TemplateResponse("info.html", {"request": request, "params":params})