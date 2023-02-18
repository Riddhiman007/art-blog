from fastapi import FastAPI, Request, HTTPException, Depends
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from database import model, schemas, crud
from database.database import SessionLocal, engine
from sqlalchemy.orm import Session
import json

model.Base.metadata.create_all(bind=engine)
app = FastAPI()

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

with open("utils/config.json", "r") as config:
    params = json.load(config)["params"]

app.mount("/static", StaticFiles(directory="static"), name="static")

templates = Jinja2Templates(directory="templates")

# routing starts from here
@app.get("/")
def home(request: Request, db:Session = Depends(get_db)):
    return templates.TemplateResponse("index.html", {"request": request, "params":params})

@app.post("/")
def index(request: Request, db:Session = Depends(get_db)):
    pass

@app.get("/posts")
def post(request: Request):
    return templates.TemplateResponse("posts.html", {"request": request, "params":params})

@app.get("/courses")
def courses(request: Request):
    return templates.TemplateResponse("course.html", {"request": request, "params":params})

@app.get("/info")
def info(request: Request):
    return templates.TemplateResponse("info.html", {"request": request, "params":params})