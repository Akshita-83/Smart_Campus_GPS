from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from math import radians, sin, cos, sqrt, atan2

from app.database.database import SessionLocal
from app.models.shuttle import Shuttle


router = APIRouter(
    prefix="/shuttles",
    tags=["Shuttles"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ======================================================
# CREATE SHUTTLE
# ======================================================

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


# ======================================================
# GET ALL SHUTTLES
# ======================================================

@router.get("/")
def get_shuttles(
    db: Session = Depends(get_db)
):
    shuttles = db.query(Shuttle).all()
    return shuttles


# ======================================================
# SHUTTLE ETA
# ======================================================

@router.get("/{shuttle_id}/eta")
def get_shuttle_eta(
    shuttle_id: int,
    student_latitude: float,
    student_longitude: float,
    db: Session = Depends(get_db)
):
    shuttle = (
        db.query(Shuttle)
        .filter(Shuttle.id == shuttle_id)
        .first()
    )

    if not shuttle:
        raise HTTPException(
            status_code=404,
            detail="Shuttle not found"
        )

    # Earth's radius in kilometers
    R = 6371

    # Convert coordinates to radians
    student_lat = radians(student_latitude)
    student_lon = radians(student_longitude)

    shuttle_lat = radians(shuttle.latitude)
    shuttle_lon = radians(shuttle.longitude)

    # Difference between coordinates
    dlat = shuttle_lat - student_lat
    dlon = shuttle_lon - student_lon

    # Haversine formula
    a = (
        sin(dlat / 2) ** 2
        + cos(student_lat)
        * cos(shuttle_lat)
        * sin(dlon / 2) ** 2
    )

    c = 2 * atan2(
        sqrt(a),
        sqrt(1 - a)
    )

    distance_km = R * c

    # Average campus shuttle speed
    average_speed_kmh = 20

    # Calculate ETA
    eta_hours = distance_km / average_speed_kmh
    eta_minutes = eta_hours * 60

    return {
        "shuttle_id": shuttle.id,
        "vehicle_number": shuttle.vehicle_number,
        "distance_km": round(distance_km, 2),
        "eta_minutes": max(1, round(eta_minutes))
    }


# ======================================================
# UPDATE SHUTTLE LOCATION
# ======================================================

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
        raise HTTPException(
            status_code=404,
            detail="Shuttle not found"
        )

    shuttle.latitude = latitude
    shuttle.longitude = longitude

    db.commit()
    db.refresh(shuttle)

    return {
        "message": "Shuttle location updated successfully",
        "shuttle": shuttle
    }


# ======================================================
# UPDATE SHUTTLE STATUS
# ======================================================

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
        raise HTTPException(
            status_code=404,
            detail="Shuttle not found"
        )

    if status not in ["active", "inactive"]:
        raise HTTPException(
            status_code=400,
            detail="Status must be active or inactive"
        )

    shuttle.status = status

    db.commit()
    db.refresh(shuttle)

    return {
        "message": "Shuttle status updated successfully",
        "shuttle": shuttle
    }