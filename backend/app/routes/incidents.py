from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.database.database import SessionLocal
from app.models.incident import Incident


# ======================================================
# ROUTER
# ======================================================

router = APIRouter(
    prefix="/incidents",
    tags=["Incidents"]
)


# ======================================================
# DATABASE CONNECTION
# ======================================================

def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


# ======================================================
# REQUEST MODEL
# ======================================================

class IncidentCreate(BaseModel):
    user_id: int | None = None
    incident_type: str = "SOS"
    latitude: float
    longitude: float
    description: str | None = None


# ======================================================
# CREATE SOS / INCIDENT
# ======================================================

@router.post("/")
def create_incident(
    incident_data: IncidentCreate,
    db: Session = Depends(get_db)
):
    incident = Incident(
        user_id=incident_data.user_id,
        incident_type=incident_data.incident_type,
        latitude=incident_data.latitude,
        longitude=incident_data.longitude,
        description=incident_data.description,
        status="active"
    )

    db.add(incident)
    db.commit()
    db.refresh(incident)

    return {
        "message": "Emergency incident created successfully",
        "incident": incident
    }


# ======================================================
# GET ALL INCIDENTS
# ======================================================

@router.get("/")
def get_incidents(
    db: Session = Depends(get_db)
):
    incidents = (
        db.query(Incident)
        .order_by(Incident.created_at.desc())
        .all()
    )

    return incidents


# ======================================================
# UPDATE INCIDENT STATUS
# ======================================================

@router.put("/{incident_id}/status")
def update_incident_status(
    incident_id: int,
    status: str,
    db: Session = Depends(get_db)
):
    incident = (
        db.query(Incident)
        .filter(Incident.id == incident_id)
        .first()
    )

    # Incident not found
    if not incident:
        raise HTTPException(
            status_code=404,
            detail="Incident not found"
        )

    # Allowed statuses
    allowed_statuses = [
        "active",
        "Acknowledged",
        "Responding",
        "Resolved"
    ]

    if status not in allowed_statuses:
        raise HTTPException(
            status_code=400,
            detail={
                "message": "Invalid incident status",
                "allowed_statuses": allowed_statuses
            }
        )

    # Update status
    incident.status = status

    db.commit()
    db.refresh(incident)

    return {
        "message": "Incident status updated successfully",
        "incident": incident
    }