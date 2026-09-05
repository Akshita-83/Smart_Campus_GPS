from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.database import Base, engine
from app.models.user import User
from app.models.location import CampusLocation
from app.models.shuttle import Shuttle
from app.models.incident import Incident

from app.routes import users, locations, shuttles
from app.routes.incidents import router as incidents_router


# ======================================================
# CREATE DATABASE TABLES
# ======================================================

Base.metadata.create_all(bind=engine)


# ======================================================
# FASTAPI APP
# ======================================================

app = FastAPI(
    title="MUJ Smart Campus GPS API",
    description="Backend API for MUJ Smart Campus",
    version="1.0.0"
)


# ======================================================
# CORS
# ======================================================

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
    allow_headers=["*"]
)


# ======================================================
# ROUTES
# ======================================================

app.include_router(users.router)
app.include_router(locations.router)
app.include_router(shuttles.router)
app.include_router(incidents_router)


# ======================================================
# HOME
# ======================================================

@app.get("/")
def home():
    return {
        "message": "MUJ Smart Campus GPS Backend is Running"
    }


# ======================================================
# HEALTH CHECK
# ======================================================

@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }