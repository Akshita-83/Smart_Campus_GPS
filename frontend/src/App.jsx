
import Login from "./pages/Login"
import { useEffect, useState } from "react"
import axios from "axios"

import "leaflet/dist/leaflet.css"

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap
} from "react-leaflet"

import L from "leaflet"

import "leaflet-routing-machine"
import "leaflet-routing-machine/dist/leaflet-routing-machine.css"

import "./App.css"


// ======================================================
// LEAFLET DEFAULT ICON
// ======================================================

delete L.Icon.Default.prototype._getIconUrl

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",

  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",

  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png"
})


// ======================================================
// USER LOCATION ICON
// ======================================================

const userIcon = L.divIcon({

  className: "custom-user-marker",

  html: `
    <div style="
      width: 22px;
      height: 22px;
      background: #1976d2;
      border: 4px solid white;
      border-radius: 50%;
      box-shadow: 0 2px 8px rgba(0,0,0,0.4);
    "></div>
  `,

  iconSize: [22, 22],

  iconAnchor: [11, 11],

  popupAnchor: [0, -11]

})


// ======================================================
// ACTIVE SHUTTLE ICON
// ======================================================

const activeShuttleIcon = L.divIcon({

  className: "custom-shuttle-marker",

  html: `
    <div style="
      width: 42px;
      height: 42px;
      background: #e53935;
      border: 3px solid white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 23px;
      box-shadow: 0 3px 10px rgba(0,0,0,0.45);
    ">
      🚌
    </div>
  `,

  iconSize: [42, 42],

  iconAnchor: [21, 21],

  popupAnchor: [0, -21]

})


// ======================================================
// INACTIVE SHUTTLE ICON
// ======================================================

const inactiveShuttleIcon = L.divIcon({

  className: "custom-shuttle-marker",

  html: `
    <div style="
      width: 42px;
      height: 42px;
      background: #757575;
      border: 3px solid white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 23px;
      opacity: 0.75;
      box-shadow: 0 3px 10px rgba(0,0,0,0.35);
    ">
      🚌
    </div>
  `,

  iconSize: [42, 42],

  iconAnchor: [21, 21],

  popupAnchor: [0, -21]

})


// ======================================================
// CAMPUS LOCATION ICON
// ======================================================

const createLocationIcon = (type) => {

  let emoji = "📍"
  let background = "#607d8b"

  const t = (type || "").toLowerCase()


  if (t.includes("academic")) {

    emoji = "🎓"
    background = "#2e7d32"

  }

  else if (t.includes("library")) {

    emoji = "📚"
    background = "#7b1fa2"

  }

  else if (
    t.includes("food") ||
    t.includes("cafeteria")
  ) {

    emoji = "🍴"
    background = "#ef6c00"

  }

  else if (t.includes("medical")) {

    emoji = "⚕️"
    background = "#c62828"

  }

  else if (t.includes("hostel")) {

    emoji = "🏠"
    background = "#f9a825"

  }

  else if (t.includes("sports")) {

    emoji = "⚽"
    background = "#00838f"

  }

  else if (t.includes("administration")) {

    emoji = "🏢"
    background = "#424242"

  }

  else if (t.includes("parking")) {

    emoji = "🅿️"
    background = "#795548"

  }

  else if (t.includes("fitness")) {

    emoji = "🏋️"
    background = "#1565c0"

  }


  return L.divIcon({

    className: "custom-location-marker",

    html: `
      <div style="
        width: 38px;
        height: 38px;
        background: ${background};
        border: 3px solid white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 19px;
        box-shadow: 0 3px 8px rgba(0,0,0,0.4);
      ">
        ${emoji}
      </div>
    `,

    iconSize: [38, 38],

    iconAnchor: [19, 19],

    popupAnchor: [0, -19]

  })

}


// ======================================================
// MAP CONTROLLER
// ======================================================

function MapController({ location }) {

  const map = useMap()

  useEffect(() => {

    if (!location) {
      return
    }

    const latitude = Number(location.latitude)
    const longitude = Number(location.longitude)

    if (
      Number.isNaN(latitude) ||
      Number.isNaN(longitude)
    ) {
      return
    }

    map.flyTo(
      [latitude, longitude],
      18,
      {
        duration: 1
      }
    )

  }, [location, map])

  return null
}


// ======================================================
// USER LOCATION CONTROLLER
// ======================================================

function UserLocationController({ location }) {

  const map = useMap()

  useEffect(() => {

    if (!location) {
      return
    }

    const latitude = Number(location.latitude)
    const longitude = Number(location.longitude)

    if (
      Number.isNaN(latitude) ||
      Number.isNaN(longitude)
    ) {
      return
    }

    map.flyTo(
      [latitude, longitude],
      18,
      {
        duration: 1
      }
    )

  }, [location, map])

  return null
}


// ======================================================
// ROUTING CONTROLLER
// ======================================================

function RoutingControl({
  userLocation,
  destination
}) {

  const map = useMap()

  useEffect(() => {

    if (
      !userLocation ||
      !destination
    ) {
      return
    }

    const userLat =
      Number(userLocation.latitude)

    const userLng =
      Number(userLocation.longitude)

    const destinationLat =
      Number(destination.latitude)

    const destinationLng =
      Number(destination.longitude)


    if (
      Number.isNaN(userLat) ||
      Number.isNaN(userLng) ||
      Number.isNaN(destinationLat) ||
      Number.isNaN(destinationLng)
    ) {
      return
    }


    const routingControl =
      L.Routing.control({

        waypoints: [

          L.latLng(
            userLat,
            userLng
          ),

          L.latLng(
            destinationLat,
            destinationLng
          )

        ],

        lineOptions: {

          styles: [
            {
              color: "#123c69",
              opacity: 0.8,
              weight: 6
            }
          ]

        },

        show: true,

        addWaypoints: false,

        draggableWaypoints: false,

        fitSelectedRoutes: true,

        routeWhileDragging: false,

        createMarker: () => null

      }).addTo(map)


    return () => {

      map.removeControl(
        routingControl
      )

    }

  }, [
    userLocation,
    destination,
    map
  ])

  return null
}


// ======================================================
// MAIN APP
// ======================================================

function App() {


  // ====================================================
  // STATES
  // ====================================================

  const [user, setUser] =
    useState(null)

  const [locations, setLocations] =
    useState([])

  const [shuttles, setShuttles] =
    useState([])

  const [search, setSearch] =
    useState("")

  const [selectedLocation,
    setSelectedLocation] =
    useState(null)

  const [selectedShuttle,
    setSelectedShuttle] =
    useState(null)

  const [userLocation,
    setUserLocation] =
    useState(null)

  const [navigationDestination,
    setNavigationDestination] =
    useState(null)

  const [loading,
    setLoading] =
    useState(true)

  const [error,
    setError] =
    useState("")

  const [sosMessage, setSosMessage] = useState("")
const [sosLoading, setSosLoading] = useState(false)


  // ====================================================
  // GET USER LOCATION
  // ====================================================

  const getUserLocation = () => {

    if (!navigator.geolocation) {

      alert(
        "Geolocation is not supported by your browser."
      )

      return
    }


    navigator.geolocation.getCurrentPosition(

      (position) => {

        setUserLocation({

          latitude:
            position.coords.latitude,

          longitude:
            position.coords.longitude

        })

      },

      (error) => {

        console.error(
          "Location error:",
          error
        )

        alert(
          "Please allow location access in your browser."
        )

      }

    )

  }


  // ====================================================
  // FETCH CAMPUS LOCATIONS
  // ====================================================

  useEffect(() => {

    const fetchLocations = async () => {

      try {

        const response =
          await axios.get(
            "http://127.0.0.1:8000/locations/"
          )

        console.log(
          "Campus locations:",
          response.data
        )

        setLocations(
          Array.isArray(response.data)
            ? response.data
            : []
        )

      }

      catch (err) {

        console.error(
          "Could not load campus locations:",
          err
        )

        setError(
          "Could not load campus locations."
        )

      }

      finally {

        setLoading(false)

      }

    }


    fetchLocations()

  }, [])


  // ====================================================
  // FETCH SHUTTLES
  // LIVE EVERY 3 SECONDS
  // ====================================================

  useEffect(() => {

    const fetchShuttles = async () => {

      try {

        const response =
          await axios.get(
            "http://127.0.0.1:8000/shuttles/"
          )

        console.log(
          "Shuttles:",
          response.data
        )

        setShuttles(
          Array.isArray(response.data)
            ? response.data
            : []
        )

      }

      catch (err) {

        console.error(
          "Could not load shuttles:",
          err
        )

      }

    }


    fetchShuttles()


    const interval =
      setInterval(
        fetchShuttles,
        3000
      )


    return () => {

      clearInterval(interval)

    }

  }, [])


  // ====================================================
  // SEARCH
  // ====================================================

  const filteredLocations =
    locations.filter((location) => {

      const text =
        search.toLowerCase().trim()

      return (

        (location.name || "")
          .toLowerCase()
          .includes(text)

        ||

        (location.type || "")
          .toLowerCase()
          .includes(text)

      )

    })


  // ====================================================
  // LOGIN
  // ====================================================
// ====================================================
// SOS EMERGENCY
// ====================================================

const sendSOS = async () => {

  if (!userLocation) {

    alert("Please click My Location first.")

    return

  }

  const confirmed = window.confirm(
    "🚨 Are you sure you want to send an SOS emergency alert?"
  )

  if (!confirmed) {
    return
  }

  setSosLoading(true)
  setSosMessage("")

  try {

    const response = await axios.post(
      "http://127.0.0.1:8000/incidents/",
      {
        user_id: user.id,
        incident_type: "SOS",
        latitude: Number(userLocation.latitude),
        longitude: Number(userLocation.longitude),
        description: "Emergency SOS alert from student"
      }
    )

    console.log("SOS response:", response.data)

    setSosMessage(
      "🚨 SOS sent successfully. Security has been notified."
    )

  } catch (error) {

    console.error("SOS error:", error)

    setSosMessage(
      "❌ Could not send SOS. Please contact security directly."
    )

  } finally {

    setSosLoading(false)

  }
}
  if (!user) {

    return (

      <Login
        onLogin={setUser}
      />

    )

  }


  // ====================================================
  // MAIN UI
  // ====================================================

  return (

    <div className="app">


      {/* ==================================================
          HEADER
      ================================================== */}

      <header className="header">

        <h1>
          🛰️ MUJ SmartCampus
        </h1>

        <p>
          Navigate. Connect. Stay Safe.
        </p>

      </header>


      <div className="content">


        {/* ==================================================
            SIDEBAR
        ================================================== */}

        <aside className="sidebar">


          {/* SEARCH */}

          <input

            className="search-box"

            type="text"

            placeholder="🔍 Search campus location..."

            value={search}

            onChange={(e) =>
              setSearch(e.target.value)
            }

          />


          {/* MY LOCATION */}

          <button

            onClick={getUserLocation}

            style={{

              width: "100%",

              padding: "11px",

              marginBottom: "15px",

              border: "none",

              borderRadius: "8px",

              background: "#1976d2",

              color: "white",

              fontSize: "15px",

              cursor: "pointer"

            }}

          >

            🔵 My Location

          </button>
<button
  onClick={sendSOS}
  disabled={sosLoading}
  style={{
    width: "100%",
    padding: "13px",
    marginBottom: "15px",
    border: "none",
    borderRadius: "8px",
    background: sosLoading ? "#999" : "#d32f2f",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: sosLoading ? "not-allowed" : "pointer"
  }}
>
  {sosLoading ? "Sending SOS..." : "🚨 SOS Emergency"}
</button>

{sosMessage && (
  <p
    style={{
      padding: "10px",
      marginBottom: "15px",
      borderRadius: "8px",
      background: "#fff3cd",
      fontSize: "13px"
    }}
  >
    {sosMessage}
  </p>
)}

          {/* ==================================================
              LEGEND
          ================================================== */}

          <div
            style={{

              padding: "10px",

              marginBottom: "15px",

              background: "#f5f5f5",

              borderRadius: "8px",

              fontSize: "14px"

            }}
          >

            <div>
              🔵 <strong>My Location</strong>
            </div>

            <div>
              🔴 <strong>Active Shuttle</strong>
            </div>

            <div>
              ⚪ <strong>Inactive Shuttle</strong>
            </div>

            <div>
              📍 <strong>Campus Location</strong>
            </div>

          </div>


          {/* ==================================================
              SHUTTLE TRACKING
          ================================================== */}

          <div
            style={{

              marginBottom: "20px",

              padding: "12px",

              background: "#fff3f3",

              borderRadius: "10px",

              border: "1px solid #ffcdd2"

            }}
          >

            <h2
              style={{
                marginTop: 0,
                marginBottom: "10px"
              }}
            >

              🚌 Shuttle Tracking

            </h2>


            {shuttles.length === 0 ? (

              <p>
                No shuttle data available.
              </p>

            ) : (

              shuttles.map((shuttle) => (

                <div

                  key={shuttle.id}

                  onClick={() => {

                    setSelectedShuttle(
                      shuttle
                    )

                    setSelectedLocation(
                      null
                    )

                  }}

                  style={{

                    padding: "10px",

                    marginBottom: "8px",

                    background: "white",

                    borderRadius: "8px",

                    cursor: "pointer",

                    border:
                      shuttle.status === "active"
                        ? "1px solid #ffcdd2"
                        : "1px solid #ddd",

                    boxShadow:
                      "0 1px 4px rgba(0,0,0,0.08)"

                  }}

                >

                  <strong>

                    🚌 {shuttle.vehicle_number}

                  </strong>


                  <p
                    style={{
                      margin: "5px 0",
                      fontSize: "13px"
                    }}
                  >

                    Driver:{" "}

                    {shuttle.driver_name ||
                      "Not assigned"}

                  </p>


                  <span
                    style={{

                      color:
                        shuttle.status === "active"
                          ? "#2e7d32"
                          : "#757575",

                      fontWeight: "bold",

                      fontSize: "13px"

                    }}
                  >

                    {shuttle.status === "active"
                      ? "🟢 ACTIVE"
                      : "⚪ INACTIVE"}

                  </span>


                  <br />


                  <button

                    onClick={(e) => {

                      e.stopPropagation()

                      setSelectedShuttle(
                        shuttle
                      )

                      setSelectedLocation(
                        null
                      )

                    }}

                    style={{

                      marginTop: "8px",

                      padding: "7px 10px",

                      border: "none",

                      borderRadius: "6px",

                      background:
                        shuttle.status === "active"
                          ? "#e53935"
                          : "#757575",

                      color: "white",

                      cursor: "pointer"

                    }}

                  >

                    📍 View on Map

                  </button>

                </div>

              ))

            )}

          </div>


          {/* ==================================================
              CAMPUS LOCATIONS
          ================================================== */}

          <h2>
            Campus Locations
          </h2>


          {loading && (

            <p>
              Loading...
            </p>

          )}


          {error && (

            <p>
              {error}
            </p>

          )}


          {!loading &&
            !error && (

              filteredLocations.length === 0

                ? (

                  <p>
                    No locations found.
                  </p>

                )

                : (

                  filteredLocations.map(
                    (location) => (

                      <div

                        className="location-card"

                        key={location.id}

                        onClick={() => {

                          setSelectedLocation(
                            location
                          )

                          setSelectedShuttle(
                            null
                          )

                        }}

                      >

                        <h3>

                          📍 {location.name}

                        </h3>


                        <p>

                          Type: {location.type}

                        </p>


                        <p>

                          {location.description}

                        </p>


                        <button

                          onClick={(e) => {

                            e.stopPropagation()

                            if (!userLocation) {

                              alert(
                                "First click My Location."
                              )

                              return

                            }

                            setNavigationDestination(
                              location
                            )

                          }}

                          style={{

                            marginTop: "8px",

                            padding:
                              "8px 12px",

                            border: "none",

                            borderRadius:
                              "6px",

                            background:
                              "#123c69",

                            color: "white",

                            cursor:
                              "pointer"

                          }}

                        >

                          🧭 Navigate Here

                        </button>

                      </div>

                    )

                  )

                )

            )}

        </aside>


        {/* ==================================================
            MAP
        ================================================== */}

        <main className="map-area">

          <MapContainer

            center={[
              26.8438,
              75.5650
            ]}

            zoom={17}

            className="map"

          >


            {/* ==================================================
                OPEN STREET MAP
            ================================================== */}

            <TileLayer

              attribution=
                '&copy; OpenStreetMap contributors'

              url=
                "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

            />


            {/* ==================================================
                CONTROLLERS
            ================================================== */}

            <MapController
              location={
                selectedLocation
              }
            />


            <MapController
              location={
                selectedShuttle
              }
            />


            <UserLocationController
              location={
                userLocation
              }
            />


            {/* ==================================================
                USER MARKER
            ================================================== */}

            {userLocation && (

              <Marker

                position={[

                  Number(
                    userLocation.latitude
                  ),

                  Number(
                    userLocation.longitude
                  )

                ]}

                icon={userIcon}

              >

                <Popup>

                  🔵 <strong>
                    You are here
                  </strong>

                </Popup>

              </Marker>

            )}


            {/* ==================================================
                CAMPUS LOCATION MARKERS
            ================================================== */}

            {filteredLocations.map(
              (location) => {

                const latitude =
                  Number(
                    location.latitude
                  )

                const longitude =
                  Number(
                    location.longitude
                  )


                if (
                  Number.isNaN(latitude) ||
                  Number.isNaN(longitude)
                ) {

                  return null

                }


                return (

                  <Marker

                    key={location.id}

                    position={[
                      latitude,
                      longitude
                    ]}

                    icon={
                      createLocationIcon(
                        location.type
                      )
                    }

                  >

                    <Popup>

                      <strong>
                        {location.name}
                      </strong>

                      <br />

                      Type:{" "}
                      {location.type}

                      <br />

                      {location.description}

                      <br />
                      <br />

                      <button

                        onClick={() => {

                          if (!userLocation) {

                            alert(
                              "First click My Location."
                            )

                            return

                          }

                          setNavigationDestination(
                            location
                          )

                        }}

                        style={{

                          padding:
                            "8px 12px",

                          border: "none",

                          borderRadius:
                            "6px",

                          background:
                            "#123c69",

                          color: "white",

                          cursor:
                            "pointer"

                        }}

                      >

                        🧭 Navigate Here

                      </button>

                    </Popup>

                  </Marker>

                )

              }
            )}


            {/* ==================================================
                SHUTTLE MARKERS
            ================================================== */}

            {shuttles.map(
              (shuttle) => {

                const latitude =
                  Number(
                    shuttle.latitude
                  )

                const longitude =
                  Number(
                    shuttle.longitude
                  )


                if (
                  Number.isNaN(latitude) ||
                  Number.isNaN(longitude)
                ) {

                  console.error(
                    "Invalid shuttle coordinates:",
                    shuttle
                  )

                  return null

                }


                return (

                  <Marker

                    key={shuttle.id}

                    position={[
                      latitude,
                      longitude
                    ]}

                    icon={
                      shuttle.status === "active"
                        ? activeShuttleIcon
                        : inactiveShuttleIcon
                    }

                    eventHandlers={{

                      click: () => {

                        setSelectedShuttle(
                          shuttle
                        )

                        setSelectedLocation(
                          null
                        )

                      }

                    }}

                  >

                    <Popup>

                      🚌 <strong>

                        {shuttle.vehicle_number}

                      </strong>


                      <br />


                      Driver:{" "}

                      {shuttle.driver_name ||
                        "Not assigned"}


                      <br />


                      Status:{" "}

                      <strong>

                        {shuttle.status === "active"
                          ? "🟢 ACTIVE"
                          : "⚪ INACTIVE"}

                      </strong>


                      <br />


                      Latitude:{" "}
                      {latitude}


                      <br />


                      Longitude:{" "}
                      {longitude}


                      <br />
                      <br />


                      <button

                        onClick={() => {

                          if (!userLocation) {

                            alert(
                              "First click My Location."
                            )

                            return

                          }


                          setNavigationDestination({

                            latitude:
                              latitude,

                            longitude:
                              longitude

                          })

                        }}

                        style={{

                          padding:
                            "8px 12px",

                          border: "none",

                          borderRadius:
                            "6px",

                          background:
                            shuttle.status === "active"
                              ? "#e53935"
                              : "#757575",

                          color: "white",

                          cursor:
                            "pointer"

                        }}

                      >

                        🧭 Navigate to Shuttle

                      </button>

                    </Popup>

                  </Marker>

                )

              }
            )}


            {/* ==================================================
                ROUTING
            ================================================== */}

            <RoutingControl

              userLocation={
                userLocation
              }

              destination={
                navigationDestination
              }

            />

          </MapContainer>

        </main>

      </div>

    </div>

  )

}


export default App
