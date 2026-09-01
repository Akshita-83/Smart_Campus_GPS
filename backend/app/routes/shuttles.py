
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import SessionLocal
from app.models.shuttle import Shuttle


router = APIRouter(
    prefix="/shuttles",
    tags=["Shuttles"]
)


# ==========================================
# DATABASE CONNECTION
# ==========================================

def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


# ==========================================
# CREATE SHUTTLE
# ==========================================

@router.post("/")
def create_shuttle(
    vehicle_number: str,
    driver_name: str = None,
    latitude: float = 26.8438,
    longitude: float = 75.5650,
    db: Session = Depends(get_db)
):

    shuttle = Shuttle(
        vehicle_number=vehicle_number,
        driver_name=driver_name,
        latitude=latitude,
        longitude=longitude,
        status="active"
    )

    db.add(shuttle)
    db.commit()
    db.refresh(shuttle)

    return shuttle


# ==========================================
# GET ALL SHUTTLES
# ==========================================

@router.get("/")
def get_shuttles(
    db: Session = Depends(get_db)
):

    shuttles = db.query(Shuttle).all()

    return shuttles


# ==========================================
# UPDATE SHUTTLE LOCATION
# ==========================================

@router.put("/{shuttle_id}/location")
def update_shuttle_location(
    shuttle_id: int,
    latitude: float,
    longitude: float,
    db: Session = Depends(get_db)
):

    shuttle = (
        db.query(Shuttle)
        .filter(Shuttle.id == shuttle_id)
        .first()
    )

    if not shuttle:

        return {
            "message": "Shuttle not found"
        }

    shuttle.latitude = latitude
    shuttle.longitude = longitude

    db.commit()
    db.refresh(shuttle)

    return {
        "message": "Shuttle location updated successfully",
        "shuttle": shuttle
    }


# ==========================================
# UPDATE SHUTTLE STATUS
# ==========================================

@router.put("/{shuttle_id}/status")
def update_shuttle_status(
    shuttle_id: int,
    status: str,
    db: Session = Depends(get_db)
):

    shuttle = (
        db.query(Shuttle)
        .filter(Shuttle.id == shuttle_id)
        .first()
    )

    if not shuttle:

        return {
            "message": "Shuttle not found"
        }

    if status not in ["active", "inactive"]:

        return {
            "message": "Status must be active or inactive"
        }

    shuttle.status = status

    db.commit()
    db.refresh(shuttle)

    return {
        "message": "Shuttle status updated successfully",
        "shuttle": shuttle
    }
