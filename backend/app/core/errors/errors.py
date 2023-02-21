from fastapi import FastAPI, status, Request, responses, APIRouter
from fastapi.templating import Jinja2Templates

# self imports
from ...utils.dependency import params

err = FastAPI()
templates = Jinja2Templates('templates/err')

@err.exception_handler(status.HTTP_500_INTERNAL_SERVER_ERROR)
async def exception_500(request:Request, exc):
    print(exc)
    return templates.TemplateResponse("500.html", {"request": request, "params":params})

@err.exception_handler(status.HTTP_404_NOT_FOUND)
async def exception_404(request:Request, exc):
    print(exc)
    return templates.TemplateResponse("404.html", {"request":request, "params":params, "exc":exc})

@err.exception_handler(status.HTTP_401_UNAUTHORIZED)
async def exception_401(request:Request, exc):
    print(exc)
    return responses.RedirectResponse('/user/login')