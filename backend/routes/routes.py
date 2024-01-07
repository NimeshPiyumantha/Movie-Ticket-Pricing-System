from fastapi import APIRouter, Depends, HTTPException
from models.movies_model import Movies
from config.db import collection_movies
from schemas.movies_schema import list_serial
from bson import ObjectId

moviesRouter = APIRouter()

# Get all movies
@moviesRouter.get("/movies")
async def get_all_movies():
    movies = list_serial(collection_movies.find())
    return movies