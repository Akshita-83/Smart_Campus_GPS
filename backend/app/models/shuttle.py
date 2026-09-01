from sqlalchemy import Column, Integer, String, Float
from app.database.database import Base


class Shuttle(Base):

    __tablename__ = "shuttles"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    vehicle_number = Column(
        String,
        nullable=False
    )

    driver_name = Column(
        String,
        nullable=True
    )

    latitude = Column(
        Float,
        nullable=False
    )

    longitude = Column(
        Float,
        nullable=False
    )

    status = Column(
        String,
        default="active"
    )