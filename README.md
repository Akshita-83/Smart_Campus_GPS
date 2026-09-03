# Smart Campus GPS

Smart Campus GPS is a campus navigation and shuttle-tracking application for Manipal University Jaipur (MUJ). It combines an interactive map, live shuttle positions, campus landmarks, browser geolocation, route navigation, and an SOS incident workflow.

## Features

- Interactive campus map powered by OpenStreetMap and Leaflet
- Campus location markers for academic buildings, libraries, food areas, hostels, medical services, sports facilities, parking, and more
- Shuttle tracking with active and inactive status indicators
- Automatic shuttle polling every three seconds in the frontend
- Browser-based "My Location" support
- Route navigation through Leaflet Routing Machine
- SOS incident creation and incident status management through the API
- FastAPI Swagger and ReDoc documentation
- SQLite persistence with SQLAlchemy

## Tech Stack

| Layer | Technologies |
| --- | --- |
| Frontend | React 19, Vite, React Router, Axios |
| Maps | Leaflet, React Leaflet, Leaflet Routing Machine, OpenStreetMap |
| Backend | Python, FastAPI, Uvicorn |
| Database | SQLite, SQLAlchemy |

## Project Structure

```text
Technical-Project2/
├── backend/
│   ├── app/
│   │   ├── database/database.py
│   │   ├── models/
│   │   ├── routes/
│   │   └── main.py
│   ├── add_locations.py
│   ├── add_shuttles.py
│   ├── move_shuttle.py
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── pages/Login.jsx
│   │   ├── App.jsx
│   │   └── ...
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## Prerequisites

- Python 3.10 or newer
- Node.js 18 or newer and npm
- A modern browser with JavaScript enabled
- Optional: browser location permission for the "My Location" feature

## Installation and Setup

### 1. Clone the repository

Replace `<repository-url>` with the URL of this GitHub repository:

```bash
git clone <repository-url>
cd Technical-Project2
```

### 2. Set up the backend

From the repository root, open PowerShell and run:

```powershell
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
pip install -r requirements.txt
```

Start the API server and keep this terminal open:

```powershell
python -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

The backend is available at:

- API: `http://127.0.0.1:8000`
- Health check: `http://127.0.0.1:8000/health`
- Swagger UI: `http://127.0.0.1:8000/docs`
- ReDoc: `http://127.0.0.1:8000/redoc`

The SQLite database is created automatically as `backend/smart_campus.db` when the application starts.

### 3. Set up the frontend

Open a second terminal at the repository root:

```powershell
cd frontend
npm install
npm run dev
```

Open the URL printed by Vite, normally `http://localhost:5173`.

The frontend is configured to call the backend at `http://127.0.0.1:8000`. Start the backend before using the map or shuttle data.

## Seed Demo Data

Start the backend once before running seed scripts so the database tables exist. In a separate terminal, from `backend`:

```powershell
cd backend
.\venv\Scripts\Activate.ps1
python add_shuttles.py
```

This adds the sample shuttles `MUJ-01`, `MUJ-02`, and `MUJ-03` without duplicating existing vehicle numbers.

To simulate shuttle movement, keep the backend running and start this command in another terminal:

```powershell
cd backend
.\venv\Scripts\Activate.ps1
python move_shuttle.py
```

The movement script updates shuttle ID `1` every five seconds. Stop it with `Ctrl+C`.

## API Overview

All create and update values are currently accepted as query parameters. Full request schemas and interactive examples are available at `/docs`.

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/` | Confirm that the backend is running |
| `GET` | `/health` | Return the service health status |
| `POST` | `/users/` | Create a user with `name`, `email`, `password`, and optional `role` |
| `GET` | `/users/` | List users |
| `POST` | `/locations/` | Create a campus location |
| `GET` | `/locations/` | List campus locations |
| `DELETE` | `/locations/{location_id}` | Delete a campus location |
| `POST` | `/shuttles/` | Create a shuttle |
| `GET` | `/shuttles/` | List shuttles |
| `PUT` | `/shuttles/{shuttle_id}/location` | Update shuttle coordinates |
| `PUT` | `/shuttles/{shuttle_id}/status` | Set shuttle status to `active` or `inactive` |
| `POST` | `/incidents/` | Create an SOS or incident record |
| `GET` | `/incidents/` | List incidents, newest first |
| `PUT` | `/incidents/{incident_id}/status` | Update an incident status |

Example requests:

```powershell
curl http://127.0.0.1:8000/health
curl http://127.0.0.1:8000/shuttles/
curl -X POST "http://127.0.0.1:8000/shuttles/?vehicle_number=MUJ-04&driver_name=Demo%20Driver"
curl -X PUT "http://127.0.0.1:8000/shuttles/1/location?latitude=26.8438&longitude=75.5650"
```

## Frontend Commands

Run these from `frontend`:

```powershell
npm run dev      # Start the development server
npm run build    # Create a production build in dist/
npm run preview  # Preview the production build locally
npm run lint     # Run ESLint
```

## Backend Commands

Run these from `backend` with the virtual environment activated:

```powershell
python -m uvicorn app.main:app --reload --port 8000
python add_shuttles.py
python move_shuttle.py
```

## Important Notes

- The login screen is currently a frontend demonstration. It accepts form values but does not authenticate against the backend or enforce role permissions.
- Passwords are currently stored as plain text by the demo API. Do not use real credentials or deploy this authentication flow to production without adding password hashing, authentication tokens, and authorization.
- Map tiles and route calculations depend on external OpenStreetMap-related services and an internet connection.
- The database path is relative to the directory where the backend is started. Start Uvicorn from `backend` to create `backend/smart_campus.db`.
- The browser must be granted location permission for the current-location feature.
- The included `add_locations.py` script is not currently a reliable location seeder; use the Swagger UI or `POST /locations/` until that script is corrected.

## Troubleshooting

### `python` or `pip` is not recognized

Install Python, reopen VS Code, and confirm:

```powershell
python --version
```

### PowerShell will not activate the virtual environment

Run the following once for the current PowerShell user, then activate again:

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
.\venv\Scripts\Activate.ps1
```

### `uvicorn` or `sqlalchemy` is not found

Make sure the backend virtual environment is active and reinstall dependencies:

```powershell
cd backend
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

### `npm` is not recognized

Install Node.js, reopen VS Code, and verify:

```powershell
node --version
npm --version
```

### Port 8000 or 5173 is already in use

Run the backend on another port, then update the frontend API URL in `frontend/src/App.jsx` if needed:

```powershell
python -m uvicorn app.main:app --reload --port 8001
```

## Validation

The current project has been verified with:

```powershell
cd backend
pip install -r requirements.txt
python -c "import app.main; print('backend import ok')"

cd ..\frontend
npm install
npm run build
npm run lint
```

The development servers were also checked at `http://127.0.0.1:8000/health` and `http://127.0.0.1:5173/`.