from app.database.database import SessionLocal
from app.models.location import Location

db = SessionLocal()

stops = [
    {
        "name": "GHS Hostel",
        "latitude": 26.8411252,
        "longitude": 75.5626736,
    },
    {
        "name": "Hostel B5",
        "latitude": 26.84295,
        "longitude": 75.56315,
    },
    {
        "name": "Manipal University Jaipur",
        "latitude": 26.8438,
        "longitude": 75.565,
    },
]

for stop in stops:
    location = Location(
        name=stop["name"],
        latitude=stop["latitude"],
        longitude=stop["longitude"],
    )

    db.add(location)

db.commit()
db.close()

print("Shuttle stops added successfully!")