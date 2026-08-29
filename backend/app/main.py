from fastapi import FastAPI


from app.database.database import Base, engine
from app.models.user import User
from app.routes import users

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="MUJ Smart Campus GPS API",
    description="Backend API for MUJ Smart Campus",
    version="1.0.0"
)
app.include_router(users.router)

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