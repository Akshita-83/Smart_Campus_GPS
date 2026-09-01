from sqlalchemy import Column, Integer, String, Float, DateTime, Text
from datetime import datetime

from app.database.database import Base


class Incident(Base):
    __tablename__ = "incidents"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, nullable=True)

    incident_type = Column(String, nullable=False)

    latitude = Column(Float, nullable=False)

    longitude = Column(Float, nullable=False)

    description = Column(Text, nullable=True)

    status = Column(String, default="active")

    created_at = Column(DateTime, default=datetime.utcnow)