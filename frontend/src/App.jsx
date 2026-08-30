import Login from "./pages/Login"
import { useEffect, useState } from "react"
import axios from "axios"

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap
} from "react-leaflet"

import L from "leaflet"

import "./App.css"


delete L.Icon.Default.prototype._getIconUrl

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",

  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",

  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png"
})


function MapController({ location }) {

  const map = useMap()

  if (location) {

    map.setView(
      [location.latitude, location.longitude],
      18
    )

  }

  return null
}


function App() {
const [user, setUser] = useState(null)
  const [locations, setLocations] = useState([])

  const [search, setSearch] = useState("")

  const [selectedLocation, setSelectedLocation] = useState(null)

  const [loading, setLoading] = useState(true)

  const [error, setError] = useState("")


  useEffect(() => {

    axios
      .get("http://127.0.0.1:8000/locations/")
      .then((response) => {

        setLocations(response.data)

        setLoading(false)

      })
      .catch((error) => {

        console.error(error)

        setError("Could not load campus locations.")

        setLoading(false)

      })

  }, [])


  const filteredLocations = locations.filter((location) => {

    const text = search.toLowerCase()

    return (
      location.name.toLowerCase().includes(text) ||
      location.type.toLowerCase().includes(text)
    )

  })

 if (!user) {
    return (
      <Login onLogin={setUser} />
    )
  }
  return (

    <div className="app">

      <header className="header">

        <h1>🛰️ MUJ SmartCampus</h1>

        <p>
          Navigate. Connect. Stay Safe.
        </p>

      </header>


      <div className="content">


        <aside className="sidebar">

          <input
            className="search-box"
            type="text"
            placeholder="🔍 Search campus location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />


          <h2>
            Campus Locations
          </h2>


          {loading && (
            <p>Loading...</p>
          )}


          {error && (
            <p>{error}</p>
          )}


          {!loading && !error && (

            filteredLocations.length === 0 ? (

              <p>No locations found.</p>

            ) : (

              filteredLocations.map((location) => (

                <div
                  className="location-card"
                  key={location.id}
                  onClick={() =>
                    setSelectedLocation(location)
                  }
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

                </div>

              ))

            )

          )}

        </aside>


        <main className="map-area">

          {!loading && !error && (

            <MapContainer
              center={[26.8438, 75.5650]}
              zoom={17}
              className="map"
            >

              <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />


              <MapController
                location={selectedLocation}
              />


              {locations.map((location) => (

                <Marker
                  key={location.id}
                  position={[
                    location.latitude,
                    location.longitude
                  ]}
                >

                  <Popup>

                    <strong>
                      {location.name}
                    </strong>

                    <br />

                    Type: {location.type}

                    <br />

                    {location.description}

                  </Popup>

                </Marker>

              ))}

            </MapContainer>

          )}

        </main>

      </div>

    </div>

  )
}


export default App