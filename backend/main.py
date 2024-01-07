from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.movies_routes import moviesRouter
from routes.employees_routes import employeesRouter

app = FastAPI()

app.include_router(moviesRouter, tags=["movies"], prefix="/api/v1")
app.include_router(employeesRouter, tags=["employees"], prefix="/api/v1")