from app.database.database import SessionLocal
from app.models.location import CampusLocation


# ============================================================
# MUJ SMART CAMPUS LOCATIONS
# ============================================================
# These are campus-area DEMO coordinates.
# Replace individual coordinates with verified building
# coordinates if you later obtain them.
# ============================================================

locations = [

    {
        "name": "Central Library",
        "type": "Library",
        "latitude": 26.84380,
        "longitude": 75.56500,
        "description": "MUJ Central Library"
    },

    {
        "name": "Academic Block",
        "type": "Academic",
        "latitude": 26.84345,
        "longitude": 75.56455,
        "description": "Main academic teaching area"
    },

    {
        "name": "Food Court",
        "type": "Food",
        "latitude": 26.84405,
        "longitude": 75.56545,
        "description": "Campus food court and dining area"
    },

    {
        "name": "Medical Centre",
        "type": "Medical",
        "latitude": 26.84435,
        "longitude": 75.56470,
        "description": "Campus medical facility"
    },

    {
        "name": "Hostel Area",
        "type": "Hostel",
        "latitude": 26.84265,
        "longitude": 75.56620,
        "description": "MUJ student hostel area"
    },

    {
        "name": "Main Gate",
        "type": "Entrance",
        "latitude": 26.84190,
        "longitude": 75.56455,
        "description": "Main campus entrance"
    },

    {
        "name": "Sports Complex",
        "type": "Sports",
        "latitude": 26.84490,
        "longitude": 75.56390,
        "description": "Campus sports facilities"
    },

    {
        "name": "Football Ground",
        "type": "Sports",
        "latitude": 26.84535,
        "longitude": 75.56435,
        "description": "Football and outdoor sports ground"
    },

    {
        "name": "Basketball Court",
        "type": "Sports",
        "latitude": 26.84510,
        "longitude": 75.56510,
        "description": "Basketball court"
    },

    {
        "name": "Tennis Court",
        "type": "Sports",
        "latitude": 26.84545,
        "longitude": 75.56575,
        "description": "Tennis court"
    },

    {
        "name": "Gym",
        "type": "Fitness",
        "latitude": 26.84300,
        "longitude": 75.56625,
        "description": "Student gym and fitness facility"
    },

    {
        "name": "Student Activity Centre",
        "type": "Student Facility",
        "latitude": 26.84285,
        "longitude": 75.56560,
        "description": "Student activity and recreation area"
    },

    {
        "name": "Auditorium",
        "type": "Auditorium",
        "latitude": 26.84335,
        "longitude": 75.56395,
        "description": "University auditorium"
    },

    {
        "name": "Administration Block",
        "type": "Administration",
        "latitude": 26.84245,
        "longitude": 75.56410,
        "description": "University administration offices"
    },

    {
        "name": "Parking Area",
        "type": "Parking",
        "latitude": 26.84175,
        "longitude": 75.56540,
        "description": "Campus parking area"
    },

    {
        "name": "Cafeteria",
        "type": "Food",
        "latitude": 26.84365,
        "longitude": 75.56605,
        "description": "Campus cafeteria"
    },

    {
        "name": "Hostel Mess",
        "type": "Food",
        "latitude": 26.84240,
        "longitude": 75.56655,
        "description": "Hostel mess and dining facility"
    },

    {
        "name": "Hostel Gym",
        "type": "Fitness",
        "latitude": 26.84205,
        "longitude": 75.56675,
        "description": "Gym facility in hostel area"
    },

    {
        "name": "Campus ATM",
        "type": "Banking",
        "latitude": 26.84315,
        "longitude": 75.56585,
        "description": "ATM facility on campus"
    },

    {
        "name": "Campus Store",
        "type": "Shopping",
        "latitude": 26.84275,
        "longitude": 75.56600,
        "description": "General and student convenience store"
    }
]


# ============================================================
# INSERT INTO DATABASE
# ============================================================

db = SessionLocal()

try:

    added = 0
    skipped = 0

    for data in locations:

        # Avoid duplicate location names
        existing = (
            db.query(CampusLocation)
            .filter(CampusLocation.name == data["name"])
            .first()
        )

        if existing:

            print(f"SKIPPED: {data['name']} already exists")
            skipped += 1

            continue

        new_location = CampusLocation(

            name=data["name"],

            type=data["type"],

            latitude=data["latitude"],

            longitude=data["longitude"],

            description=data["description"]

        )

        db.add(new_location)

        added += 1

        print(f"ADDED: {data['name']}")

    db.commit()

    print()
    print("========================================")
    print("LOCATION IMPORT COMPLETE")
    print("========================================")
    print(f"Added   : {added}")
    print(f"Skipped : {skipped}")
    print("========================================")


except Exception as e:

    db.rollback()

    print()
    print("ERROR:")
    print(e)


finally:

    db.close()