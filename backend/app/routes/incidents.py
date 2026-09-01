from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import SessionLocal
from app.models.incident import Incident


router = APIRouter(
    prefix="/incidents",
    tags=["Incidents"]
)


def get_db():
    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


# CREATE SOS / INCIDENT
@router.post("/")
def create_incident(
    user_id: int = None,
    incident_type: str = "SOS",
    latitude: float = 0,
    longitude: float = 0,
    description: str = None,
    db: Session = Depends(get_db)
):

    incident = Incident(
        user_id=user_id,
        incident_type=incident_type,
        latitude=latitude,
        longitude=longitude,
        description=description,
        status="active"
    )

    db.add(incident)
    db.commit()
    db.refresh(incident)

    return {
        "message": "Emergency incident created successfully",
        "incident": incident
    }


# GET ALL INCIDENTS
@router.get("/")
def get_incidents(
    db: Session = Depends(get_db)
):

    incidents = db.query(Incident).order_by(
        Incident.created_at.desc()
    ).all()

    return incidents


# UPDATE INCIDENT STATUS
@router.put("/{incident_id}/status")
def update_incident_status(
    incident_id: int,
    status: str,
    db: Session = Depends(get_db)
):

    incident = db.query(Incident).filter(
        Incident.id == incident_id
    ).first()

    if not incident:
        return {
            "message": "Incident not found"
        }

    incident.status = status

    db.commit()
    db.refresh(incident)

    return {
        "message": "Incident status updated successfully",
        "incident": incident
    }