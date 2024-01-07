from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.routes import moviesRouter

app = FastAPI()

app.include_router(moviesRouter, tags=["movies"], prefix="/api/v1")