import { useEffect, useState } from "react";
import axios from "axios";

import Login from "./pages/Login";
import SecurityDashboard from "./pages/SecurityDashboard";

import "leaflet/dist/leaflet.css";
import "./App.css";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";

import L from "leaflet";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://127.0.0.1:8000";

// ======================================================
// LEAFLET DEFAULT MARKER ICON FIX
// ======================================================

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

// ======================================================
// CUSTOM ICON CREATOR
// ======================================================

const createIcon = (
  background,
  emoji,
  size = 40
) =>
  L.divIcon({
    className: "",
    html: `
      <div style="
        width:${size}px;
        height:${size}px;
        background:${background};
        border:3px solid white;
        border-radius:50%;
        display:flex;
        align-items:center;
        justify-content:center;
        font-size:${Math.round(size * 0.52)}px;
        box-shadow:0 2px 8px rgba(0,0,0,0.4);
        box-sizing:border-box;
      ">
        ${emoji}
      </div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2],
  });

// ======================================================
// ICONS
// ======================================================

const shuttleIcon = createIcon(
  "#e53935",
  "🚌",
  40
);

const studentIcon = createIcon(
  "#2e7d32",
  "👤",
  40
);

const getLocationIcon = (type) => {
  const colors = {
    Hostel: "#1565c0",
    Food: "#ef6c00",
    Mess: "#ef6c00",
    Shop: "#8e24aa",
    Medical: "#d32f2f",
    Service: "#6a1b9a",
    Parking: "#455a64",
    Recreation: "#2e7d32",
  };

  return createIcon(
    colors[type] || "#1976d2",
    "📍",
    34
  );
};

// ======================================================
// GHS MUJ HOSTEL LOCATIONS
// ======================================================

const GHS_LOCATIONS = [
  {
    id: "ghs-hostel",
    name: "GHS Hostel",
    type: "Hostel",
    description:
      "Good Host Spaces (GHS) Hostel, MUJ",
    latitude: 26.8411252,
    longitude: 75.5626736,
  },
  {
    id: "hostel-b5",
    name: "Hostel Block B5",
    type: "Hostel",
    description:
      "GHS Boys Hostel Block B5",
    latitude: 26.84295,
    longitude: 75.56315,
  },
  {
    id: "b7-boys",
    name: "B7 Boy's Block",
    type: "Hostel",
    description:
      "GHS Boys Hostel B7 Block",
    latitude: 26.84335,
    longitude: 75.56275,
  },
  {
    id: "b6-block",
    name: "B6 Block",
    type: "Hostel",
    description:
      "GHS Hostel B6 Block",
    latitude: 26.84365,
    longitude: 75.56315,
  },
  {
    id: "b5-block",
    name: "B5 Block",
    type: "Hostel",
    description:
      "GHS Hostel B5 Block",
    latitude: 26.84315,
    longitude: 75.56345,
  },
  {
    id: "b2-block",
    name: "B2 Block",
    type: "Hostel",
    description:
      "GHS Hostel B2 Block",
    latitude: 26.84365,
    longitude: 75.56375,
  },
  {
    id: "g1-block",
    name: "G1 Block",
    type: "Hostel",
    description:
      "GHS Girls Hostel G1 Block",
    latitude: 26.84205,
    longitude: 75.56455,
  },
  {
    id: "g2-block",
    name: "G2 Block",
    type: "Hostel",
    description:
      "GHS Girls Hostel G2 Block",
    latitude: 26.8422,
    longitude: 75.56375,
  },
  {
    id: "g3-block",
    name: "G3 Block",
    type: "Hostel",
    description:
      "GHS Girls Hostel G3 Block",
    latitude: 26.84205,
    longitude: 75.5639,
  },
  {
    id: "g4-block",
    name: "G4 Block",
    type: "Hostel",
    description:
      "GHS Girls Hostel G4 Block",
    latitude: 26.84245,
    longitude: 75.56305,
  },

  // ====================================================
  // FOOD
  // ====================================================

  {
    id: "crazy-chef",
    name: "Crazy Chef",
    type: "Food",
    description:
      "Food outlet near GHS Hostel",
    latitude: 26.84315,
    longitude: 75.56405,
  },
  {
    id: "cafe-dialog",
    name: "Café Dialog",
    type: "Food",
    description:
      "Café and food outlet",
    latitude: 26.84295,
    longitude: 75.56455,
  },
  {
    id: "all-mart",
    name: "All Mart",
    type: "Shop",
    description:
      "Convenience store near GHS Hostel",
    latitude: 26.84315,
    longitude: 75.56445,
  },
  {
    id: "tea-tradition",
    name: "Tea Tradition",
    type: "Food",
    description:
      "Tea and refreshments",
    latitude: 26.84255,
    longitude: 75.5632,
  },
  {
    id: "dev-sweets",
    name: "Dev Sweets And Snacks",
    type: "Food",
    description:
      "Sweets and snacks",
    latitude: 26.8424,
    longitude: 75.56345,
  },
  {
    id: "manipal-mess",
    name: "Manipal Mess",
    type: "Mess",
    description:
      "Mess facility",
    latitude: 26.84235,
    longitude: 75.56275,
  },
  {
    id: "login-cafe",
    name: "Login Cafe",
    type: "Food",
    description:
      "Cafe and refreshments",
    latitude: 26.84225,
    longitude: 75.56475,
  },
  {
    id: "kebab-nation",
    name: "Kebab Nation",
    type: "Food",
    description:
      "Food outlet",
    latitude: 26.84235,
    longitude: 75.56505,
  },
  {
    id: "jaipur-bakers",
    name: "Jaipur Bakers",
    type: "Food",
    description:
      "Bakery and snacks",
    latitude: 26.8422,
    longitude: 75.5638,
  },
  {
    id: "lets-go-live",
    name: "Lets Go Live",
    type: "Food",
    description:
      "Food and refreshments",
    latitude: 26.8422,
    longitude: 75.56355,
  },
  {
    id: "bluedove-mess",
    name: "Bluedove Mess",
    type: "Mess",
    description:
      "Mess facility",
    latitude: 26.84255,
    longitude: 75.56295,
  },

  // ====================================================
  // SERVICES
  // ====================================================

  {
    id: "best-care-pharmacy",
    name: "Best Care Pharmacy",
    type: "Medical",
    description:
      "Pharmacy and medical supplies",
    latitude: 26.84275,
    longitude: 75.56395,
  },
  {
    id: "softdodge",
    name: "Softdodge",
    type: "Recreation",
    description:
      "Recreation facility",
    latitude: 26.84335,
    longitude: 75.5637,
  },
  {
    id: "laundry",
    name: "Laundry",
    type: "Service",
    description:
      "Hostel laundry facility",
    latitude: 26.84185,
    longitude: 75.56275,
  },
  {
    id: "parking-ghs",
    name: "GHS Parking",
    type: "Parking",
    description:
      "Parking area",
    latitude: 26.842,
    longitude: 75.56295,
  },

  // ====================================================
  // RECREATION
  // ====================================================

  {
    id: "moggers-park",
    name: "Moggers Park",
    type: "Recreation",
    description:
      "Park and recreation area",
    latitude: 26.84185,
    longitude: 75.5644,
  },
];

// ======================================================
// HELPER FUNCTIONS
// ======================================================

const getValidCoordinate = (value) => {
  const number = Number(value);

  return Number.isFinite(number)
    ? number
    : null;
};

const normalizeLocation = (
  location,
  index
) => ({
  ...location,

  id:
    location.id ??
    `api-location-${index}`,

  name:
    location.name ??
    "Unknown Location",

  type:
    location.type ??
    "Service",

  description:
    location.description ??
    "",

  latitude:
    getValidCoordinate(
      location.latitude
    ),

  longitude:
    getValidCoordinate(
      location.longitude
    ),
});

// ======================================================
// APP
// ======================================================

function App() {
  // ====================================================
  // AUTH
  // ====================================================

  const [user, setUser] = useState(null);

  // ====================================================
  // DATA
  // ====================================================

  const [locations, setLocations] =
    useState([]);

  const [shuttles, setShuttles] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  // ====================================================
  // SEARCH / FILTER
  // ====================================================

  const [search, setSearch] =
    useState("");

  const [category, setCategory] =
    useState("All");

  // ====================================================
  // SOS
  // ====================================================

  const [sendingSOS, setSendingSOS] =
    useState(false);

  // ====================================================
  // NAVIGATION
  // ====================================================

  const [
    selectedDestination,
    setSelectedDestination,
  ] = useState(null);

  const [
    studentLocation,
    setStudentLocation,
  ] = useState(null);

  const [
    gettingLocation,
    setGettingLocation,
  ] = useState(false);

  const [
    routeCoordinates,
    setRouteCoordinates,
  ] = useState([]);

  const [
    routeDistance,
    setRouteDistance,
  ] = useState(null);

  const [
    routeDuration,
    setRouteDuration,
  ] = useState(null);

  const [
    loadingRoute,
    setLoadingRoute,
  ] = useState(false);

  // ====================================================
  // FETCH INITIAL DATA
  // ====================================================

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      setLoading(true);

      try {
        const [
          locationsResponse,
          shuttlesResponse,
        ] = await Promise.allSettled([
          axios.get(
            `${API_BASE_URL}/locations/`,
            {
              timeout: 10000,
            }
          ),

          axios.get(
            `${API_BASE_URL}/shuttles/`,
            {
              timeout: 10000,
            }
          ),
        ]);

        if (!mounted) return;

        // ==============================================
        // LOCATIONS
        // ==============================================

        let apiLocations = [];

        if (
          locationsResponse.status ===
            "fulfilled" &&
          Array.isArray(
            locationsResponse.value.data
          )
        ) {
          apiLocations =
            locationsResponse.value.data.map(
              (location, index) =>
                normalizeLocation(
                  location,
                  index
                )
            );
        }

        const combinedLocations = [
          ...apiLocations,
          ...GHS_LOCATIONS,
        ];

        // Remove duplicate names
        const uniqueLocations =
          combinedLocations.filter(
            (
              location,
              index,
              array
            ) =>
              index ===
              array.findIndex(
                (item) =>
                  String(
                    item.name || ""
                  ).toLowerCase() ===
                  String(
                    location.name || ""
                  ).toLowerCase()
              )
          );

        setLocations(
          uniqueLocations
        );

        // ==============================================
        // SHUTTLES
        // ==============================================

        if (
          shuttlesResponse.status ===
            "fulfilled" &&
          Array.isArray(
            shuttlesResponse.value.data
          )
        ) {
          setShuttles(
            shuttlesResponse.value.data
          );
        } else {
          setShuttles([]);
        }

        // ==============================================
        // ERROR STATE
        // ==============================================

        const locationsFailed =
          locationsResponse.status ===
          "rejected";

        const shuttlesFailed =
          shuttlesResponse.status ===
          "rejected";

        if (
          locationsFailed ||
          shuttlesFailed
        ) {
          setError(
            "Backend unavailable. Showing offline campus locations."
          );
        } else {
          setError("");
        }
      } catch (err) {
        console.error(
          "API ERROR:",
          err
        );

        if (!mounted) return;

        setLocations(
          GHS_LOCATIONS
        );

        setShuttles([]);

        setError(
          "Backend unavailable. Showing offline campus locations."
        );
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, []);

  // ====================================================
  // LIVE SHUTTLE TRACKING
  // ====================================================

  useEffect(() => {
    let mounted = true;

    const fetchShuttleUpdates =
      async () => {
        try {
          const response =
            await axios.get(
              `${API_BASE_URL}/shuttles/`,
              {
                timeout: 10000,
              }
            );

          if (
            mounted &&
            Array.isArray(
              response.data
            )
          ) {
            setShuttles(
              response.data
            );
          }
        } catch (err) {
          console.error(
            "SHUTTLE UPDATE ERROR:",
            err
          );
        }
      };

    // Get latest shuttle positions immediately
    fetchShuttleUpdates();

    // Update every 10 seconds
    const interval =
      setInterval(
        fetchShuttleUpdates,
        10000
      );

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  // ====================================================
  // SOS
  // ====================================================

  const handleSOS = () => {
    if (!navigator.geolocation) {
      alert(
        "❌ Geolocation is not supported by your browser."
      );

      return;
    }

    const confirmSOS =
      window.confirm(
        "🚨 Are you sure you want to send an SOS alert?\n\n" +
          "Your current location will be shared with campus security."
      );

    if (!confirmSOS) return;

    setSendingSOS(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude =
          position.coords.latitude;

        const longitude =
          position.coords.longitude;

        try {
          await axios.post(
            `${API_BASE_URL}/incidents/`,
            {
              user_id:
                user?.id || 1,

              incident_type:
                "SOS",

              latitude,

              longitude,

              description:
                "Student requires emergency assistance",
            },
            {
              timeout: 10000,
            }
          );

          alert(
            "🚨 SOS SENT SUCCESSFULLY!\n\n" +
              "Campus security has received your emergency alert and location."
          );
        } catch (err) {
          console.error(
            "SOS ERROR:",
            err
          );

          alert(
            "❌ SOS could not be sent.\n\n" +
              "Please make sure the FastAPI backend is running."
          );
        } finally {
          setSendingSOS(false);
        }
      },

      (geoError) => {
        console.error(
          "LOCATION ERROR:",
          geoError
        );

        setSendingSOS(false);

        switch (geoError.code) {
          case 1:
            alert(
              "📍 Location permission was denied.\n\n" +
                "Please allow location access and try again."
            );
            break;

          case 2:
            alert(
              "📍 Your location could not be determined.\n\n" +
                "Please try again."
            );
            break;

          case 3:
            alert(
              "📍 Location request timed out.\n\n" +
                "Please try again."
            );
            break;

          default:
            alert(
              "📍 Could not get your location."
            );
        }
      },

      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  // ====================================================
  // NAVIGATION
  // ====================================================

  const handleNavigate = (
    location
  ) => {
    if (!navigator.geolocation) {
      alert(
        "Geolocation is not supported by your browser."
      );

      return;
    }

    const destinationLat =
      Number(location.latitude);

    const destinationLng =
      Number(location.longitude);

    if (
      !Number.isFinite(
        destinationLat
      ) ||
      !Number.isFinite(
        destinationLng
      )
    ) {
      alert(
        "This location does not have valid coordinates."
      );

      return;
    }

    setSelectedDestination(
      location
    );

    setGettingLocation(true);

    setRouteCoordinates([]);

    setRouteDistance(null);

    setRouteDuration(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const studentLat =
          position.coords.latitude;

        const studentLng =
          position.coords.longitude;

        setStudentLocation([
          studentLat,
          studentLng,
        ]);

        setGettingLocation(
          false
        );

        setLoadingRoute(true);

        try {
          const response =
            await axios.get(
              `https://router.project-osrm.org/route/v1/driving/${studentLng},${studentLat};${destinationLng},${destinationLat}`,
              {
                params: {
                  overview:
                    "full",

                  geometries:
                    "geojson",
                },

                timeout: 15000,
              }
            );

          const route =
            response.data
              ?.routes?.[0];

          if (!route) {
            throw new Error(
              "No route found"
            );
          }

          const coordinates =
            route.geometry?.coordinates?.map(
              ([
                longitude,
                latitude,
              ]) => [
                latitude,
                longitude,
              ]
            ) || [];

          setRouteCoordinates(
            coordinates
          );

          setRouteDistance(
            (
              Number(
                route.distance
              ) / 1000
            ).toFixed(2)
          );

          setRouteDuration(
            Math.ceil(
              Number(
                route.duration
              ) / 60
            )
          );
        } catch (err) {
          console.error(
            "ROUTE ERROR:",
            err
          );

          setRouteCoordinates([]);

          setRouteDistance(
            null
          );

          setRouteDuration(
            null
          );

          alert(
            "Unable to calculate the route. Please try again."
          );
        } finally {
          setLoadingRoute(false);
        }
      },

      (geoError) => {
        console.error(
          "LOCATION ERROR:",
          geoError
        );

        setGettingLocation(
          false
        );

        setLoadingRoute(false);

        alert(
          "Unable to get your current location. Please allow location access."
        );
      },

      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  // ====================================================
  // CLEAR NAVIGATION
  // ====================================================

  const clearNavigation = () => {
    setSelectedDestination(
      null
    );

    setStudentLocation(
      null
    );

    setRouteCoordinates(
      []
    );

    setRouteDistance(
      null
    );

    setRouteDuration(
      null
    );

    setGettingLocation(
      false
    );

    setLoadingRoute(
      false
    );
  };

  // ====================================================
  // LOGIN
  // ====================================================

  if (!user) {
    return (
      <Login
        onLogin={setUser}
      />
    );
  }

  // ====================================================
  // SECURITY / ADMIN
  // ====================================================

  if (
    user.role ===
      "security" ||
    user.role === "admin"
  ) {
    return (
      <SecurityDashboard />
    );
  }

  // ====================================================
  // FILTER LOCATIONS
  // ====================================================

  const filteredLocations =
    locations.filter(
      (location) => {
        const text =
          search
            .toLowerCase()
            .trim();

        const name =
          String(
            location.name || ""
          ).toLowerCase();

        const type =
          String(
            location.type || ""
          ).toLowerCase();

        const description =
          String(
            location.description ||
              ""
          ).toLowerCase();

        const matchesSearch =
          !text ||
          name.includes(text) ||
          type.includes(text) ||
          description.includes(
            text
          );

        let matchesCategory =
          true;

        if (
          category ===
          "Hostels"
        ) {
          matchesCategory =
            location.type ===
            "Hostel";
        }

        if (
          category === "Food"
        ) {
          matchesCategory =
            location.type ===
              "Food" ||
            location.type ===
              "Mess";
        }

        if (
          category ===
          "Services"
        ) {
          matchesCategory =
            location.type ===
              "Medical" ||
            location.type ===
              "Service" ||
            location.type ===
              "Shop" ||
            location.type ===
              "Parking";
        }

        if (
          category ===
          "Recreation"
        ) {
          matchesCategory =
            location.type ===
            "Recreation";
        }

        return (
          matchesSearch &&
          matchesCategory
        );
      }
    );

  // ====================================================
  // MAIN UI
  // ====================================================

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "#f5f5f5",
        color: "#222",
      }}
    >
      {/* ==================================================
          HEADER
      ================================================== */}

      <header
        style={{
          minHeight: "75px",
          background: "#123c69",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent:
            "space-between",
          padding: "0 25px",
          boxSizing:
            "border-box",
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: "24px",
            }}
          >
            🛰️ MUJ SmartCampus
          </h1>

          <div
            style={{
              fontSize: "13px",
              marginTop: "4px",
            }}
          >
            Navigate. Connect.
            Stay Safe.
          </div>
        </div>

        <button
          onClick={() =>
            setUser(null)
          }
          style={{
            padding:
              "9px 16px",
            border: "none",
            borderRadius: "7px",
            background: "#424242",
            color: "white",
            cursor: "pointer",
          }}
        >
          🚪 Logout
        </button>
      </header>

      {/* ==================================================
          CONTENT
      ================================================== */}

      <div
        style={{
          flex: 1,
          display: "flex",
          minHeight: 0,
        }}
      >
        {/* ==================================================
            SIDEBAR
        ================================================== */}

        <aside
          style={{
            width: "350px",
            flexShrink: 0,
            background: "white",
            padding: "15px",
            boxSizing:
              "border-box",
            overflowY: "auto",
            borderRight:
              "1px solid #ddd",
          }}
        >
          {/* USER */}

          <div
            style={{
              background:
                "#e3f2fd",
              padding: "12px",
              borderRadius: "8px",
              marginBottom:
                "15px",
            }}
          >
            <strong>
              👤 Logged in
            </strong>

            <div
              style={{
                marginTop: "5px",
              }}
            >
              {user.email}
            </div>

            <div>
              Role:{" "}
              <strong>
                {user.role}
              </strong>
            </div>
          </div>

          {/* SOS */}

          <div
            style={{
              background:
                "#ffebee",
              border:
                "2px solid #ef5350",
              borderRadius:
                "10px",
              padding: "15px",
              marginBottom:
                "20px",
              textAlign:
                "center",
            }}
          >
            <h2
              style={{
                margin:
                  "0 0 8px 0",
                color: "#c62828",
                fontSize:
                  "20px",
              }}
            >
              🚨 Emergency?
            </h2>

            <p
              style={{
                margin:
                  "0 0 12px 0",
                fontSize:
                  "13px",
                color: "#555",
              }}
            >
              Send your current
              location to campus
              security.
            </p>

            <button
              onClick={
                handleSOS
              }
              disabled={
                sendingSOS
              }
              style={{
                width: "100%",
                padding: "13px",
                background:
                  sendingSOS
                    ? "#9e9e9e"
                    : "#d32f2f",
                color: "white",
                border: "none",
                borderRadius:
                  "8px",
                fontSize:
                  "17px",
                fontWeight:
                  "bold",
                cursor:
                  sendingSOS
                    ? "not-allowed"
                    : "pointer",
              }}
            >
              {sendingSOS
                ? "📍 Sending SOS..."
                : "🚨 SEND SOS"}
            </button>
          </div>

          {/* ==================================================
              NAVIGATION
          ================================================== */}

          {selectedDestination && (
            <div
              style={{
                background:
                  "#e8f5e9",
                border:
                  "1px solid #81c784",
                borderRadius:
                  "10px",
                padding: "12px",
                marginBottom:
                  "20px",
              }}
            >
              <h3
                style={{
                  margin:
                    "0 0 10px 0",
                }}
              >
                🧭 Navigation
              </h3>

              <p
                style={{
                  margin:
                    "8px 0",
                }}
              >
                Destination:
                <br />

                <strong>
                  📍{" "}
                  {
                    selectedDestination.name
                  }
                </strong>
              </p>

              {gettingLocation && (
                <p>
                  📍 Finding your
                  current location...
                </p>
              )}

              {loadingRoute && (
                <p>
                  🧭 Calculating
                  route...
                </p>
              )}

              {studentLocation && (
                <p
                  style={{
                    fontSize:
                      "12px",
                    marginBottom:
                      "8px",
                  }}
                >
                  Your location:
                  <br />

                  {studentLocation[0].toFixed(
                    6
                  )}
                  ,{" "}
                  {studentLocation[1].toFixed(
                    6
                  )}
                </p>
              )}

              {routeDistance !==
                null &&
                routeDuration !==
                  null && (
                  <div
                    style={{
                      background:
                        "white",
                      padding:
                        "10px",
                      borderRadius:
                        "8px",
                      marginTop:
                        "10px",
                      marginBottom:
                        "10px",
                    }}
                  >
                    <p
                      style={{
                        margin:
                          "4px 0",
                      }}
                    >
                      📏 Distance:
                      <strong>
                        {" "}
                        {
                          routeDistance
                        }{" "}
                        km
                      </strong>
                    </p>

                    <p
                      style={{
                        margin:
                          "4px 0",
                      }}
                    >
                      ⏱️ Estimated
                      time:
                      <strong>
                        {" "}
                        {
                          routeDuration
                        }{" "}
                        min
                      </strong>
                    </p>
                  </div>
                )}

              <button
                onClick={
                  clearNavigation
                }
                style={{
                  width: "100%",
                  padding: "9px",
                  background:
                    "#616161",
                  color: "white",
                  border: "none",
                  borderRadius:
                    "7px",
                  cursor:
                    "pointer",
                }}
              >
                ✖ Clear Navigation
              </button>
            </div>
          )}

          {/* ==================================================
              SEARCH
          ================================================== */}

          <input
            type="text"
            placeholder="🔍 Search campus location..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            style={{
              width: "100%",
              padding: "12px",
              boxSizing:
                "border-box",
              border:
                "1px solid #ccc",
              borderRadius:
                "8px",
              marginBottom:
                "15px",
              fontSize:
                "14px",
            }}
          />

          {/* ==================================================
              FILTER
          ================================================== */}

          <div
            style={{
              display: "flex",
              gap: "6px",
              flexWrap: "wrap",
              marginBottom:
                "20px",
            }}
          >
            {[
              "All",
              "Hostels",
              "Food",
              "Services",
              "Recreation",
            ].map(
              (item) => (
                <button
                  key={item}
                  onClick={() =>
                    setCategory(
                      item
                    )
                  }
                  style={{
                    padding:
                      "8px 10px",
                    border: "none",
                    borderRadius:
                      "20px",
                    background:
                      category ===
                      item
                        ? "#1976d2"
                        : "#e0e0e0",
                    color:
                      category ===
                      item
                        ? "white"
                        : "#333",
                    cursor:
                      "pointer",
                    fontWeight:
                      "bold",
                    fontSize:
                      "12px",
                  }}
                >
                  {item}
                </button>
              )
            )}
          </div>

          {/* ==================================================
              SHUTTLES
          ================================================== */}

          <div
            style={{
              background:
                "#fff3f3",
              border:
                "1px solid #ffcdd2",
              borderRadius:
                "10px",
              padding: "12px",
              marginBottom:
                "20px",
            }}
          >
            <h2
              style={{
                marginTop: 0,
              }}
            >
              🚌 Shuttle Tracking
            </h2>

            <div
              style={{
                fontSize:
                  "12px",
                color: "#666",
                marginBottom:
                  "10px",
              }}
            >
              🔄 Live updates
              every 10 seconds
            </div>

            {shuttles.length ===
            0 ? (
              <p>
                No shuttle data
                available.
              </p>
            ) : (
              shuttles.map(
                (
                  shuttle,
                  index
                ) => (
                  <div
                    key={
                      shuttle.id ??
                      shuttle.vehicle_number ??
                      `shuttle-${index}`
                    }
                    style={{
                      background:
                        "white",
                      padding:
                        "12px",
                      marginBottom:
                        "10px",
                      borderRadius:
                        "8px",
                      border:
                        "1px solid #ddd",
                    }}
                  >
                    <strong>
                      🚌{" "}
                      {shuttle.vehicle_number ||
                        "Unknown Shuttle"}
                    </strong>

                    <p
                      style={{
                        margin:
                          "6px 0",
                      }}
                    >
                      Driver:{" "}
                      {shuttle.driver_name ||
                        "Not assigned"}
                    </p>

                    <strong
                      style={{
                        color:
                          shuttle.status ===
                          "active"
                            ? "green"
                            : "gray",
                      }}
                    >
                      {shuttle.status ===
                      "active"
                        ? "🟢 ACTIVE"
                        : "⚪ INACTIVE"}
                    </strong>

                    {shuttle.latitude !==
                      undefined &&
                      shuttle.longitude !==
                        undefined && (
                        <p
                          style={{
                            fontSize:
                              "12px",
                            marginBottom:
                              0,
                          }}
                        >
                          📍{" "}
                          {
                            shuttle.latitude
                          }
                          ,{" "}
                          {
                            shuttle.longitude
                          }
                        </p>
                      )}
                  </div>
                )
              )
            )}
          </div>

          {/* ==================================================
              LOCATIONS
          ================================================== */}

          <h2>
            📍 Campus Locations
          </h2>

          {loading && (
            <p>
              Loading campus
              data...
            </p>
          )}

          {error && (
            <div
              style={{
                background:
                  "#fff3cd",
                color: "#856404",
                padding: "12px",
                borderRadius:
                  "8px",
                marginBottom:
                  "15px",
              }}
            >
              ⚠️ {error}
            </div>
          )}

          {!loading &&
            filteredLocations.length ===
              0 && (
              <p>
                No locations
                found.
              </p>
            )}

          {filteredLocations.map(
            (
              location,
              index
            ) => {
              return (
                <div
                  key={
                    location.id ??
                    `${location.name}-${index}`
                  }
                  style={{
                    padding:
                      "12px",
                    marginBottom:
                      "10px",
                    border:
                      "1px solid #ddd",
                    borderRadius:
                      "8px",
                    background:
                      "#fafafa",
                  }}
                >
                  <h3
                    style={{
                      margin:
                        "0 0 6px 0",
                    }}
                  >
                    📍{" "}
                    {
                      location.name
                    }
                  </h3>

                  <div>
                    <strong>
                      Type:
                    </strong>{" "}
                    {
                      location.type
                    }
                  </div>

                  <p
                    style={{
                      margin:
                        "6px 0",
                    }}
                  >
                    {
                      location.description
                    }
                  </p>

                  <small>
                    {
                      location.latitude
                    }
                    ,{" "}
                    {
                      location.longitude
                    }
                  </small>

                  <button
                    onClick={() =>
                      handleNavigate(
                        location
                      )
                    }
                    disabled={
                      gettingLocation ||
                      loadingRoute
                    }
                    style={{
                      width: "100%",
                      marginTop:
                        "10px",
                      padding:
                        "10px",
                      border: "none",
                      borderRadius:
                        "7px",
                      background:
                        gettingLocation ||
                        loadingRoute
                          ? "#9e9e9e"
                          : "#1976d2",
                      color:
                        "white",
                      fontWeight:
                        "bold",
                      cursor:
                        gettingLocation ||
                        loadingRoute
                          ? "not-allowed"
                          : "pointer",
                    }}
                  >
                    {gettingLocation
                      ? "📍 Finding Location..."
                      : loadingRoute
                      ? "🧭 Calculating Route..."
                      : "🧭 Navigate Here"}
                  </button>
                </div>
              );
            }
          )}
        </aside>

        {/* ==================================================
            MAP
        ================================================== */}

        <main
          style={{
            flex: 1,
            minWidth: 0,
            minHeight: 0,
          }}
        >
          <MapContainer
            center={[
              26.8438,
              75.565,
            ]}
            zoom={17}
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* ==================================================
                STUDENT LOCATION
            ================================================== */}

            {studentLocation && (
              <Marker
                position={
                  studentLocation
                }
                icon={
                  studentIcon
                }
              >
                <Popup>
                  📍{" "}
                  <strong>
                    Your Current
                    Location
                  </strong>

                  {selectedDestination && (
                    <>
                      <br />
                      Navigating to:
                      <br />

                      <strong>
                        {
                          selectedDestination.name
                        }
                      </strong>
                    </>
                  )}
                </Popup>
              </Marker>
            )}

            {/* ==================================================
                ROUTE
            ================================================== */}

            {routeCoordinates.length >
              0 && (
              <Polyline
                positions={
                  routeCoordinates
                }
                pathOptions={{
                  color:
                    "#1976d2",
                  weight: 6,
                  opacity: 0.8,
                }}
              />
            )}

            {/* ==================================================
                CAMPUS LOCATIONS
            ================================================== */}

            {filteredLocations.map(
              (
                location,
                index
              ) => {
                const lat =
                  Number(
                    location.latitude
                  );

                const lng =
                  Number(
                    location.longitude
                  );

                if (
                  !Number.isFinite(
                    lat
                  ) ||
                  !Number.isFinite(
                    lng
                  )
                ) {
                  return null;
                }

                return (
                  <Marker
                    key={`location-${location.id ?? index}`}
                    position={[
                      lat,
                      lng,
                    ]}
                    icon={getLocationIcon(
                      location.type
                    )}
                  >
                    <Popup>
                      <strong>
                        {
                          location.name
                        }
                      </strong>

                      <br />

                      Type:{" "}
                      {
                        location.type
                      }

                      <br />

                      {
                        location.description
                      }

                      <br />
                      <br />

                      <button
                        onClick={() =>
                          handleNavigate(
                            location
                          )
                        }
                        style={{
                          padding:
                            "8px 12px",
                          background:
                            "#1976d2",
                          color:
                            "white",
                          border:
                            "none",
                          borderRadius:
                            "6px",
                          cursor:
                            "pointer",
                        }}
                      >
                        🧭 Navigate
                        Here
                      </button>
                    </Popup>
                  </Marker>
                );
              }
            )}

            {/* ==================================================
                SHUTTLES
            ================================================== */}

            {shuttles.map(
              (
                shuttle,
                index
              ) => {
                const lat =
                  Number(
                    shuttle.latitude
                  );

                const lng =
                  Number(
                    shuttle.longitude
                  );

                if (
                  !Number.isFinite(
                    lat
                  ) ||
                  !Number.isFinite(
                    lng
                  )
                ) {
                  return null;
                }

                return (
                  <Marker
                    key={`shuttle-${shuttle.id ?? index}`}
                    position={[
                      lat,
                      lng,
                    ]}
                    icon={
                      shuttleIcon
                    }
                  >
                    <Popup>
                      <strong>
                        🚌{" "}
                        {shuttle.vehicle_number ||
                          "Shuttle"}
                      </strong>

                      <br />

                      Driver:{" "}
                      {shuttle.driver_name ||
                        "Not assigned"}

                      <br />

                      Status:{" "}
                      {shuttle.status ||
                        "unknown"}

                      <br />

                      📍{" "}
                      {lat.toFixed(
                        6
                      )}
                      ,{" "}
                      {lng.toFixed(
                        6
                      )}
                    </Popup>
                  </Marker>
                );
              }
            )}
          </MapContainer>
        </main>
      </div>
    </div>
  );
}

export default App;