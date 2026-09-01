from app.database.database import SessionLocal
from app.models.shuttle import Shuttle


shuttles = [
    {
        "vehicle_number": "MUJ-01",
        "driver_name": "Shuttle Driver 1",
        "latitude": 26.84250,
        "longitude": 75.56480,
        "status": "active"
    },
    {
        "vehicle_number": "MUJ-02",
        "driver_name": "Shuttle Driver 2",
        "latitude": 26.84420,
        "longitude": 75.56600,
        "status": "active"
    },
    {
        "vehicle_number": "MUJ-03",
        "driver_name": "Shuttle Driver 3",
        "latitude": 26.84320,
        "longitude": 75.56380,
        "status": "inactive"
    }
]


db = SessionLocal()

try:

    added = 0
    skipped = 0

    for data in shuttles:

        existing = (
            db.query(Shuttle)
            .filter(
                Shuttle.vehicle_number ==
                data["vehicle_number"]
            )
            .first()
        )

        if existing:
            print(
                f"SKIPPED: {data['vehicle_number']} already exists"
            )
            skipped += 1
            continue

        shuttle = Shuttle(
            vehicle_number=data["vehicle_number"],
            driver_name=data["driver_name"],
            latitude=data["latitude"],
            longitude=data["longitude"],
            status=data["status"]
        )

        db.add(shuttle)

        print(
            f"ADDED: {data['vehicle_number']}"
        )

        added += 1

    db.commit()

    print()
    print("==============================")
    print("SHUTTLE IMPORT COMPLETE")
    print("==============================")
    print(f"Added   : {added}")
    print(f"Skipped : {skipped}")
    print("==============================")


except Exception as e:

    db.rollback()
    print("ERROR:", e)


finally:

    db.close()