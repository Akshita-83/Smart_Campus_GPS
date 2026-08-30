from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import SessionLocal
from app.models.location import CampusLocation


router = APIRouter(
    prefix="/locations",
    tags=["Campus Locations"]
)


# Database connection
def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


# Create a campus location
@router.post("/")
def create_location(
    name: str,
    type: str,
    latitude: float,
    longitude: float,
    description: str = None,
    db: Session = Depends(get_db)
):
    new_location = CampusLocation(
        name=name,
        type=type,
        latitude=latitude,
        longitude=longitude,
        description=description
    )

    db.add(new_location)
    db.commit()
    db.refresh(new_location)

    return {
        "message": "Campus location created successfully",
        "location": {
            "id": new_location.id,
            "name": new_location.name,
            "type": new_location.type,
            "latitude": new_location.latitude,
            "longitude": new_location.longitude,
            "description": new_location.description
        }
    }


# Get all campus locations
@router.get("/")
def get_locations(db: Session = Depends(get_db)):

    locations = db.query(CampusLocation).all()

    return locations

# Delete a campus location
@router.delete("/{location_id}")
def delete_location(
    location_id: int,
    db: Session = Depends(get_db)
):
    location = db.query(CampusLocation).filter(
        CampusLocation.id == location_id
    ).first()

    if not location:
        return {
            "message": "Location not found"
        }

    db.delete(location)
    db.commit()

    return {
        "message": "Location deleted successfully"
    }