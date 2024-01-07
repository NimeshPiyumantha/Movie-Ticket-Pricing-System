from pymongo import MongoClient
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Get MongoDB URI from environment variables
uri = os.getenv("MONGO_URI")

# Initialize MongoDB client
client = MongoClient(uri)

# Access the desired database
db = client["movies_ticket_pricing_db"]

collection_movies = db["movies"]
collection_employees = db["employees"]