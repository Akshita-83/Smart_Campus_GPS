from app.database.database import SessionLocal
from app.models.location import CampusLocation


locations = [
    {
        "name": "Main Gate",
        "type": "Gate",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "Main entrance of MUJ campus"
    },
    {
        "name": "Sports Complex",
        "type": "Sports",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "MUJ sports and recreational facilities"
    },
    {
        "name": "Parking Area",
        "type": "Parking",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "Campus parking area"
    },
    {
        "name": "ATM",
        "type": "ATM",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "Campus ATM facility"
    },
    {
        "name": "Security Office",
        "type": "Security",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "Campus security office"
    },
    {
        "name": "Shuttle Stop",
        "type": "Shuttle",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "Campus shuttle pickup point"
    },
    {
        "name": "Administration Block",
        "type": "Administration",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "University administration offices"
    },
    {
        "name": "Laboratory Block",
        "type": "Laboratory",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "Academic laboratories"
    },
    {
        "name": "Cafeteria",
        "type": "Food",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "Campus cafeteria"
    }
]


db = SessionLocal()

try:

    for location_data in locations:

        location = CampusLocation(**location_data)

        db.add(location)

    db.commit()

    print("All campus locations added successfully!")

finally:

    db.close()from app.database.database import SessionLocal
from app.models.location import CampusLocation


locations = [
    {
        "name": "Main Gate",
        "type": "Gate",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "Main entrance of MUJ campus"
    },
    {
        "name": "Sports Complex",
        "type": "Sports",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "MUJ sports and recreational facilities"
    },
    {
        "name": "Parking Area",
        "type": "Parking",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "Campus parking area"
    },
    {
        "name": "ATM",
        "type": "ATM",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "Campus ATM facility"
    },
    {
        "name": "Security Office",
        "type": "Security",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "Campus security office"
    },
    {
        "name": "Shuttle Stop",
        "type": "Shuttle",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "Campus shuttle pickup point"
    },
    {
        "name": "Administration Block",
        "type": "Administration",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "University administration offices"
    },
    {
        "name": "Laboratory Block",
        "type": "Laboratory",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "Academic laboratories"
    },
    {
        "name": "Cafeteria",
        "type": "Food",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "Campus cafeteria"
    }
]


db = SessionLocal()

try:

    for location_data in locations:

        location = CampusLocation(**location_data)

        db.add(location)

    db.commit()

    print("All campus locations added successfully!")

finally:

    db.close()from app.database.database import SessionLocal
from app.models.location import CampusLocation


locations = [
    {
        "name": "Main Gate",
        "type": "Gate",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "Main entrance of MUJ campus"
    },
    {
        "name": "Sports Complex",
        "type": "Sports",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "MUJ sports and recreational facilities"
    },
    {
        "name": "Parking Area",
        "type": "Parking",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "Campus parking area"
    },
    {
        "name": "ATM",
        "type": "ATM",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "Campus ATM facility"
    },
    {
        "name": "Security Office",
        "type": "Security",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "Campus security office"
    },
    {
        "name": "Shuttle Stop",
        "type": "Shuttle",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "Campus shuttle pickup point"
    },
    {
        "name": "Administration Block",
        "type": "Administration",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "University administration offices"
    },
    {
        "name": "Laboratory Block",
        "type": "Laboratory",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "Academic laboratories"
    },
    {
        "name": "Cafeteria",
        "type": "Food",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "Campus cafeteria"
    }
]


db = SessionLocal()

try:

    for location_data in locations:

        location = CampusLocation(**location_data)

        db.add(location)

    db.commit()

    print("All campus locations added successfully!")

finally:

    db.close()from app.database.database import SessionLocal
from app.models.location import CampusLocation


locations = [
    {
        "name": "Main Gate",
        "type": "Gate",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "Main entrance of MUJ campus"
    },
    {
        "name": "Sports Complex",
        "type": "Sports",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "MUJ sports and recreational facilities"
    },
    {
        "name": "Parking Area",
        "type": "Parking",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "Campus parking area"
    },
    {
        "name": "ATM",
        "type": "ATM",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "Campus ATM facility"
    },
    {
        "name": "Security Office",
        "type": "Security",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "Campus security office"
    },
    {
        "name": "Shuttle Stop",
        "type": "Shuttle",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "Campus shuttle pickup point"
    },
    {
        "name": "Administration Block",
        "type": "Administration",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "University administration offices"
    },
    {
        "name": "Laboratory Block",
        "type": "Laboratory",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "Academic laboratories"
    },
    {
        "name": "Cafeteria",
        "type": "Food",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "Campus cafeteria"
    }
]


db = SessionLocal()

try:

    for location_data in locations:

        location = CampusLocation(**location_data)

        db.add(location)

    db.commit()

    print("All campus locations added successfully!")

finally:

    db.close()from app.database.database import SessionLocal
from app.models.location import CampusLocation


locations = [
    {
        "name": "Main Gate",
        "type": "Gate",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "Main entrance of MUJ campus"
    },
    {
        "name": "Sports Complex",
        "type": "Sports",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "MUJ sports and recreational facilities"
    },
    {
        "name": "Parking Area",
        "type": "Parking",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "Campus parking area"
    },
    {
        "name": "ATM",
        "type": "ATM",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "Campus ATM facility"
    },
    {
        "name": "Security Office",
        "type": "Security",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "Campus security office"
    },
    {
        "name": "Shuttle Stop",
        "type": "Shuttle",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "Campus shuttle pickup point"
    },
    {
        "name": "Administration Block",
        "type": "Administration",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "University administration offices"
    },
    {
        "name": "Laboratory Block",
        "type": "Laboratory",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "Academic laboratories"
    },
    {
        "name": "Cafeteria",
        "type": "Food",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "Campus cafeteria"
    }
]


db = SessionLocal()

try:

    for location_data in locations:

        location = CampusLocation(**location_data)

        db.add(location)

    db.commit()

    print("All campus locations added successfully!")

finally:

    db.close()from app.database.database import SessionLocal
from app.models.location import CampusLocation


locations = [
    {
        "name": "Main Gate",
        "type": "Gate",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "Main entrance of MUJ campus"
    },
    {
        "name": "Sports Complex",
        "type": "Sports",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "MUJ sports and recreational facilities"
    },
    {
        "name": "Parking Area",
        "type": "Parking",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "Campus parking area"
    },
    {
        "name": "ATM",
        "type": "ATM",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "Campus ATM facility"
    },
    {
        "name": "Security Office",
        "type": "Security",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "Campus security office"
    },
    {
        "name": "Shuttle Stop",
        "type": "Shuttle",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "Campus shuttle pickup point"
    },
    {
        "name": "Administration Block",
        "type": "Administration",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "University administration offices"
    },
    {
        "name": "Laboratory Block",
        "type": "Laboratory",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "Academic laboratories"
    },
    {
        "name": "Cafeteria",
        "type": "Food",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "Campus cafeteria"
    }
]


db = SessionLocal()

try:

    for location_data in locations:

        location = CampusLocation(**location_data)

        db.add(location)

    db.commit()

    print("All campus locations added successfully!")

finally:

    db.close()from app.database.database import SessionLocal
from app.models.location import CampusLocation


locations = [
    {
        "name": "Main Gate",
        "type": "Gate",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "Main entrance of MUJ campus"
    },
    {
        "name": "Sports Complex",
        "type": "Sports",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "MUJ sports and recreational facilities"
    },
    {
        "name": "Parking Area",
        "type": "Parking",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "Campus parking area"
    },
    {
        "name": "ATM",
        "type": "ATM",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "Campus ATM facility"
    },
    {
        "name": "Security Office",
        "type": "Security",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "Campus security office"
    },
    {
        "name": "Shuttle Stop",
        "type": "Shuttle",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "Campus shuttle pickup point"
    },
    {
        "name": "Administration Block",
        "type": "Administration",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "University administration offices"
    },
    {
        "name": "Laboratory Block",
        "type": "Laboratory",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "Academic laboratories"
    },
    {
        "name": "Cafeteria",
        "type": "Food",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "Campus cafeteria"
    }
]


db = SessionLocal()

try:

    for location_data in locations:

        location = CampusLocation(**location_data)

        db.add(location)

    db.commit()

    print("All campus locations added successfully!")

finally:

    db.close()from app.database.database import SessionLocal
from app.models.location import CampusLocation


locations = [
    {
        "name": "Main Gate",
        "type": "Gate",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "Main entrance of MUJ campus"
    },
    {
        "name": "Sports Complex",
        "type": "Sports",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "MUJ sports and recreational facilities"
    },
    {
        "name": "Parking Area",
        "type": "Parking",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "Campus parking area"
    },
    {
        "name": "ATM",
        "type": "ATM",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "Campus ATM facility"
    },
    {
        "name": "Security Office",
        "type": "Security",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "Campus security office"
    },
    {
        "name": "Shuttle Stop",
        "type": "Shuttle",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "Campus shuttle pickup point"
    },
    {
        "name": "Administration Block",
        "type": "Administration",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "University administration offices"
    },
    {
        "name": "Laboratory Block",
        "type": "Laboratory",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "Academic laboratories"
    },
    {
        "name": "Cafeteria",
        "type": "Food",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "Campus cafeteria"
    }
]


db = SessionLocal()

try:

    for location_data in locations:

        location = CampusLocation(**location_data)

        db.add(location)

    db.commit()

    print("All campus locations added successfully!")

finally:

    db.close()from app.database.database import SessionLocal
from app.models.location import CampusLocation


locations = [
    {
        "name": "Main Gate",
        "type": "Gate",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "Main entrance of MUJ campus"
    },
    {
        "name": "Sports Complex",
        "type": "Sports",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "MUJ sports and recreational facilities"
    },
    {
        "name": "Parking Area",
        "type": "Parking",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "Campus parking area"
    },
    {
        "name": "ATM",
        "type": "ATM",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "Campus ATM facility"
    },
    {
        "name": "Security Office",
        "type": "Security",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "Campus security office"
    },
    {
        "name": "Shuttle Stop",
        "type": "Shuttle",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "Campus shuttle pickup point"
    },
    {
        "name": "Administration Block",
        "type": "Administration",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "University administration offices"
    },
    {
        "name": "Laboratory Block",
        "type": "Laboratory",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "Academic laboratories"
    },
    {
        "name": "Cafeteria",
        "type": "Food",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "Campus cafeteria"
    }
]


db = SessionLocal()

try:

    for location_data in locations:

        location = CampusLocation(**location_data)

        db.add(location)

    db.commit()

    print("All campus locations added successfully!")

finally:

    db.close()from app.database.database import SessionLocal
from app.models.location import CampusLocation


locations = [
    {
        "name": "Main Gate",
        "type": "Gate",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "Main entrance of MUJ campus"
    },
    {
        "name": "Sports Complex",
        "type": "Sports",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "MUJ sports and recreational facilities"
    },
    {
        "name": "Parking Area",
        "type": "Parking",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "Campus parking area"
    },
    {
        "name": "ATM",
        "type": "ATM",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "Campus ATM facility"
    },
    {
        "name": "Security Office",
        "type": "Security",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "Campus security office"
    },
    {
        "name": "Shuttle Stop",
        "type": "Shuttle",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "Campus shuttle pickup point"
    },
    {
        "name": "Administration Block",
        "type": "Administration",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "University administration offices"
    },
    {
        "name": "Laboratory Block",
        "type": "Laboratory",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "Academic laboratories"
    },
    {
        "name": "Cafeteria",
        "type": "Food",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "Campus cafeteria"
    }
]


db = SessionLocal()

try:

    for location_data in locations:

        location = CampusLocation(**location_data)

        db.add(location)

    db.commit()

    print("All campus locations added successfully!")

finally:

    db.close()from app.database.database import SessionLocal
from app.models.location import CampusLocation


locations = [
    {
        "name": "Main Gate",
        "type": "Gate",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "Main entrance of MUJ campus"
    },
    {
        "name": "Sports Complex",
        "type": "Sports",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "MUJ sports and recreational facilities"
    },
    {
        "name": "Parking Area",
        "type": "Parking",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "Campus parking area"
    },
    {
        "name": "ATM",
        "type": "ATM",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "Campus ATM facility"
    },
    {
        "name": "Security Office",
        "type": "Security",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "Campus security office"
    },
    {
        "name": "Shuttle Stop",
        "type": "Shuttle",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "Campus shuttle pickup point"
    },
    {
        "name": "Administration Block",
        "type": "Administration",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "University administration offices"
    },
    {
        "name": "Laboratory Block",
        "type": "Laboratory",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "Academic laboratories"
    },
    {
        "name": "Cafeteria",
        "type": "Food",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "Campus cafeteria"
    }
]


db = SessionLocal()

try:

    for location_data in locations:

        location = CampusLocation(**location_data)

        db.add(location)

    db.commit()

    print("All campus locations added successfully!")

finally:

    db.close()from app.database.database import SessionLocal
from app.models.location import CampusLocation


locations = [
    {
        "name": "Main Gate",
        "type": "Gate",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "Main entrance of MUJ campus"
    },
    {
        "name": "Sports Complex",
        "type": "Sports",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "MUJ sports and recreational facilities"
    },
    {
        "name": "Parking Area",
        "type": "Parking",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "Campus parking area"
    },
    {
        "name": "ATM",
        "type": "ATM",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "Campus ATM facility"
    },
    {
        "name": "Security Office",
        "type": "Security",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "Campus security office"
    },
    {
        "name": "Shuttle Stop",
        "type": "Shuttle",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "Campus shuttle pickup point"
    },
    {
        "name": "Administration Block",
        "type": "Administration",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "University administration offices"
    },
    {
        "name": "Laboratory Block",
        "type": "Laboratory",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "Academic laboratories"
    },
    {
        "name": "Cafeteria",
        "type": "Food",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "Campus cafeteria"
    }
]


db = SessionLocal()

try:

    for location_data in locations:

        location = CampusLocation(**location_data)

        db.add(location)

    db.commit()

    print("All campus locations added successfully!")

finally:

    db.close()from app.database.database import SessionLocal
from app.models.location import CampusLocation


locations = [
    {
        "name": "Main Gate",
        "type": "Gate",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "Main entrance of MUJ campus"
    },
    {
        "name": "Sports Complex",
        "type": "Sports",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "MUJ sports and recreational facilities"
    },
    {
        "name": "Parking Area",
        "type": "Parking",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "Campus parking area"
    },
    {
        "name": "ATM",
        "type": "ATM",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "Campus ATM facility"
    },
    {
        "name": "Security Office",
        "type": "Security",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "Campus security office"
    },
    {
        "name": "Shuttle Stop",
        "type": "Shuttle",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "Campus shuttle pickup point"
    },
    {
        "name": "Administration Block",
        "type": "Administration",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "University administration offices"
    },
    {
        "name": "Laboratory Block",
        "type": "Laboratory",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "Academic laboratories"
    },
    {
        "name": "Cafeteria",
        "type": "Food",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "Campus cafeteria"
    }
]


db = SessionLocal()

try:

    for location_data in locations:

        location = CampusLocation(**location_data)

        db.add(location)

    db.commit()

    print("All campus locations added successfully!")

finally:

    db.close()from app.database.database import SessionLocal
from app.models.location import CampusLocation


locations = [
    {
        "name": "Main Gate",
        "type": "Gate",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "Main entrance of MUJ campus"
    },
    {
        "name": "Sports Complex",
        "type": "Sports",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "MUJ sports and recreational facilities"
    },
    {
        "name": "Parking Area",
        "type": "Parking",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "Campus parking area"
    },
    {
        "name": "ATM",
        "type": "ATM",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "Campus ATM facility"
    },
    {
        "name": "Security Office",
        "type": "Security",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "Campus security office"
    },
    {
        "name": "Shuttle Stop",
        "type": "Shuttle",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "Campus shuttle pickup point"
    },
    {
        "name": "Administration Block",
        "type": "Administration",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "University administration offices"
    },
    {
        "name": "Laboratory Block",
        "type": "Laboratory",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "Academic laboratories"
    },
    {
        "name": "Cafeteria",
        "type": "Food",
        "latitude": 0.0,       # Replace with actual latitude
        "longitude": 0.0,      # Replace with actual longitude
        "description": "Campus cafeteria"
    }
]


db = SessionLocal()

try:

    for location_data in locations:

        location = CampusLocation(**location_data)

        db.add(location)

    db.commit()

    print("All campus locations added successfully!")

finally:

    db.close()