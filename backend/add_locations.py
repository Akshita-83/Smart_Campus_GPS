from app.database.database import SessionLocal
from app.models.shuttle import Shuttle


# ============================================================
# MUJ SHUTTLES
# ============================================================

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
        "latitude": 26.84510,
        "longitude": 75.56620,
        "status": "active"
    },

    {
        "vehicle_number": "MUJ-03",
        "driver_name": "Shuttle Driver 3",
        "latitude": 26.84180,
        "longitude": 75.56420,
        "status": "inactive"
    }
]


# ============================================================
# DATABASE
# ============================================================

db = SessionLocal()

try:

    added = 0
    updated = 0

    for data in shuttles:

        # Find existing shuttle
        existing = (
            db.query(Shuttle)
            .filter(
                Shuttle.vehicle_number ==
                data["vehicle_number"]
            )
            .first()
        )

        # ====================================================
        # UPDATE EXISTING SHUTTLE
        # ====================================================

        if existing:

            existing.driver_name = data["driver_name"]
            existing.latitude = data["latitude"]
            existing.longitude = data["longitude"]
            existing.status = data["status"]

            print(
                f"UPDATED: {data['vehicle_number']}"
            )

            updated += 1

        # ====================================================
        # ADD NEW SHUTTLE
        # ====================================================

        else:

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
    print("================================")
    print("SHUTTLE UPDATE COMPLETE")
    print("================================")
    print(f"Added   : {added}")
    print(f"Updated : {updated}")
    print("================================")


except Exception as e:

    db.rollback()

    print()
    print("ERROR:")
    print(e)


finally:

    db.close()