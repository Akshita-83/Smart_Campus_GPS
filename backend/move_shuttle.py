
import requests
import time

# ==========================================
# SHUTTLE SETTINGS
# ==========================================

SHUTTLE_ID = 1

# MUJ campus demo route
route = [
    (26.84250, 75.56480),
    (26.84300, 75.56520),
    (26.84380, 75.56500),
    (26.84420, 75.56600),
    (26.84490, 75.56550),
    (26.84535, 75.56435),
    (26.84490, 75.56390),
    (26.84380, 75.56500),
]

API_URL = (
    f"http://127.0.0.1:8000"
    f"/shuttles/{SHUTTLE_ID}/location"
)


# ==========================================
# AUTOMATIC MOVEMENT
# ==========================================

print("🚌 MUJ Shuttle Live Movement Started")
print("Press CTRL + C to stop.")
print()

while True:

    for latitude, longitude in route:

        try:

            response = requests.put(
                API_URL,
                params={
                    "latitude": latitude,
                    "longitude": longitude
                }
            )

            if response.status_code == 200:

                print(
                    f"🚌 MUJ-01 moved to "
                    f"{latitude}, {longitude}"
                )

            else:

                print(
                    "❌ Update failed:",
                    response.text
                )

        except Exception as e:

            print("❌ Connection error:", e)

        # Wait before moving to next point
        time.sleep(5)
