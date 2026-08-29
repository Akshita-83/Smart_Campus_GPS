from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import SessionLocal
from app.models.user import User

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)


# Database connection
def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


# Create a user
@router.post("/")
def create_user(
    name: str,
    email: str,
    password: str,
    role: str = "student",
    db: Session = Depends(get_db)
):
    new_user = User(
        name=name,
        email=email,
        password=password,
        role=role
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "User created successfully",
        "user": {
            "id": new_user.id,
            "name": new_user.name,
            "email": new_user.email,
            "role": new_user.role
        }
    }


# Get all users
@router.get("/")
def get_users(db: Session = Depends(get_db)):

    users = db.query(User).all()

    return users