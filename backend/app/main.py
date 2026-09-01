from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.database import Base, engine
from app.models.user import User
from app.models.location import CampusLocation
from app.models.shuttle import Shuttle
from app.routes import users, locations, shuttles

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="MUJ Smart Campus GPS API",
    description="Backend API for MUJ Smart Campus",
    version="1.0.0"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5174"
],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(users.router)
app.include_router(locations.router)
app.include_router(shuttles.router)

@app.get("/")

def home():
    return {
        "message": "MUJ Smart Campus GPS Backend is Running"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }