import { useEffect, useState } from "react";
import axios from "axios";

import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup
} from "react-leaflet";

import L from "leaflet";

// ============================================
// FIX LEAFLET MARKER ICON
// ============================================

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",

  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",

  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png"
});

// ============================================
// EMERGENCY ICON
// ============================================

const emergencyIcon = L.divIcon({
  className: "",
  html: `
    <div style="
      width:42px;
      height:42px;
      background:#d32f2f;
      border:3px solid white;
      border-radius:50%;
      display:flex;
      align-items:center;
      justify-content:center;
      font-size:22px;
      box-shadow:0 2px 10px rgba(0,0,0,0.45);
    ">
      🚨
    </div>
  `,
  iconSize: [42, 42],
  iconAnchor: [21, 21]
});

// ============================================
// SECURITY DASHBOARD
// ============================================

function SecurityDashboard() {

  const [incidents, setIncidents] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [updatingId, setUpdatingId] = useState(null);

  // ============================================
  // FETCH INCIDENTS
  // ============================================

  const fetchIncidents = async () => {

    try {

      const response = await axios.get(
        "http://127.0.0.1:8000/incidents/"
      );

      if (Array.isArray(response.data)) {

        setIncidents(response.data);

      } else {

        setIncidents([]);

      }

      setError("");

    } catch (error) {

      console.error(
        "Could not load incidents:",
        error
      );

      setError(
        "Could not connect to the security server."
      );

    } finally {

      setLoading(false);

    }
  };

  // ============================================
  // AUTO REFRESH
  // ============================================

  useEffect(() => {

    fetchIncidents();

    const interval = setInterval(
      fetchIncidents,
      3000
    );

    return () => {
      clearInterval(interval);
    };

  }, []);

  // ============================================
  // UPDATE INCIDENT STATUS
  // ============================================

  const updateStatus = async (
    incidentId,
    status
  ) => {

    try {

      setUpdatingId(incidentId);

      await axios.put(
        `http://127.0.0.1:8000/incidents/${incidentId}/status`,
        null,
        {
          params: {
            status: status
          }
        }
      );

      await fetchIncidents();

    } catch (error) {

      console.error(
        "Could not update incident:",
        error
      );

      alert(
        "Could not update incident status."
      );

    } finally {

      setUpdatingId(null);

    }
  };

  // ============================================
  // STATUS COLOR
  // ============================================

  const getStatusColor = (status) => {

    const normalized =
      String(status || "").toLowerCase();

    if (normalized === "active") {
      return "#d32f2f";
    }

    if (normalized === "acknowledged") {
      return "#f57c00";
    }

    if (normalized === "responding") {
      return "#1976d2";
    }

    if (normalized === "resolved") {
      return "#2e7d32";
    }

    return "#757575";
  };

  // ============================================
  // ACTIVE INCIDENT COUNT
  // ============================================

  const activeIncidents =
    incidents.filter((incident) => {

      const status =
        String(incident.status || "")
          .toLowerCase();

      return (
        status === "active" ||
        status === "new" ||
        status === "acknowledged" ||
        status === "responding"
      );

    });

  // ============================================
  // MAIN UI
  // ============================================

  return (

    <div
      style={{
        minHeight: "100vh",
        background: "#f4f6f8",
        color: "#222"
      }}
    >

      {/* ========================================
          HEADER
      ======================================== */}

      <header
        style={{
          background: "#123c69",
          color: "white",
          padding: "20px 25px",
          boxShadow:
            "0 2px 8px rgba(0,0,0,0.15)"
        }}
      >

        <h1
          style={{
            margin: 0,
            fontSize: "26px"
          }}
        >
          🛡️ MUJ Security Dashboard
        </h1>

        <p
          style={{
            margin: "6px 0 0",
            opacity: 0.9
          }}
        >
          Monitor and manage campus emergency incidents.
        </p>

      </header>


      {/* ========================================
          SUMMARY CARDS
      ======================================== */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "15px",
          padding: "20px 25px 0"
        }}
      >

        {/* TOTAL */}

        <div
          style={{
            background: "white",
            padding: "18px",
            borderRadius: "10px",
            boxShadow:
              "0 2px 8px rgba(0,0,0,0.08)"
          }}
        >

          <div
            style={{
              fontSize: "13px",
              color: "#666"
            }}
          >
            Total Incidents
          </div>

          <div
            style={{
              fontSize: "28px",
              fontWeight: "bold",
              marginTop: "5px"
            }}
          >
            {incidents.length}
          </div>

        </div>


        {/* ACTIVE */}

        <div
          style={{
            background: "#fff5f5",
            padding: "18px",
            borderRadius: "10px",
            border:
              "1px solid #ffcdd2"
          }}
        >

          <div
            style={{
              fontSize: "13px",
              color: "#666"
            }}
          >
            Active Incidents
          </div>

          <div
            style={{
              fontSize: "28px",
              fontWeight: "bold",
              color: "#d32f2f",
              marginTop: "5px"
            }}
          >
            {activeIncidents.length}
          </div>

        </div>


        {/* SYSTEM */}

        <div
          style={{
            background: "#f1f8e9",
            padding: "18px",
            borderRadius: "10px",
            border:
              "1px solid #c5e1a5"
          }}
        >

          <div
            style={{
              fontSize: "13px",
              color: "#666"
            }}
          >
            System Status
          </div>

          <div
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              color: "#2e7d32",
              marginTop: "8px"
            }}
          >
            🟢 Online
          </div>

        </div>

      </div>


      {/* ========================================
          ERROR
      ======================================== */}

      {error && (

        <div
          style={{
            margin: "20px 25px",
            padding: "14px",
            background: "#ffebee",
            color: "#c62828",
            borderRadius: "8px"
          }}
        >
          {error}
        </div>

      )}


      {/* ========================================
          MAP
      ======================================== */}

      <div
        style={{
          margin: "20px 25px",
          background: "white",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow:
            "0 2px 8px rgba(0,0,0,0.08)"
        }}
      >

        <div
          style={{
            padding: "15px 18px",
            borderBottom:
              "1px solid #eee"
          }}
        >

          <h2
            style={{
              margin: 0
            }}
          >
            🗺️ Live Incident Map
          </h2>

        </div>


        <div
          style={{
            height: "400px"
          }}
        >

          <MapContainer
            center={[
              26.8438,
              75.5650
            ]}
            zoom={16}
            style={{
              width: "100%",
              height: "100%"
            }}
          >

            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />


            {/* INCIDENT MARKERS */}

            {incidents.map((incident) => {

              const lat =
                Number(incident.latitude);

              const lng =
                Number(incident.longitude);

              if (
                Number.isNaN(lat) ||
                Number.isNaN(lng)
              ) {

                return null;

              }

              return (

                <Marker
                  key={`incident-${incident.id}`}
                  position={[
                    lat,
                    lng
                  ]}
                  icon={emergencyIcon}
                >

                  <Popup>

                    <strong>
                      🚨 {incident.incident_type}
                    </strong>

                    <br />

                    Status:{" "}
                    {incident.status}

                    <br />

                    User ID:{" "}
                    {incident.user_id || "Unknown"}

                    <br />

                    Location:
                    <br />

                    {lat}, {lng}

                    <br />

                    <br />

                    {incident.description ||
                      "No description"}

                  </Popup>

                </Marker>

              );

            })}

          </MapContainer>

        </div>

      </div>


      {/* ========================================
          INCIDENT LIST
      ======================================== */}

      <div
        style={{
          padding: "0 25px 30px"
        }}
      >

        <h2>
          🚨 Emergency Incidents
        </h2>


        {loading ? (

          <div
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "10px"
            }}
          >
            Loading incidents...
          </div>

        ) : incidents.length === 0 ? (

          <div
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "10px",
              color: "#2e7d32"
            }}
          >
            ✅ No incidents reported.
          </div>

        ) : (

          <div>

            {incidents.map((incident) => {

              const statusColor =
                getStatusColor(
                  incident.status
                );

              return (

                <div
                  key={incident.id}
                  style={{
                    background: "white",
                    padding: "20px",
                    marginBottom: "15px",
                    borderRadius: "10px",

                    borderLeft:
                      `6px solid ${statusColor}`,

                    boxShadow:
                      "0 2px 8px rgba(0,0,0,0.08)"
                  }}
                >

                  {/* TITLE */}

                  <div
                    style={{
                      display: "flex",
                      justifyContent:
                        "space-between",
                      alignItems: "center",
                      gap: "10px",
                      flexWrap: "wrap"
                    }}
                  >

                    <h2
                      style={{
                        margin: 0,
                        color:
                          incident.status ===
                          "active"
                            ? "#d32f2f"
                            : "#222"
                      }}
                    >
                      🚨{" "}
                      {incident.incident_type}
                    </h2>


                    <span
                      style={{
                        background:
                          statusColor,
                        color: "white",
                        padding:
                          "6px 12px",
                        borderRadius:
                          "20px",
                        fontSize: "13px",
                        fontWeight:
                          "bold"
                      }}
                    >
                      {incident.status}
                    </span>

                  </div>


                  {/* DETAILS */}

                  <div
                    style={{
                      marginTop: "15px"
                    }}
                  >

                    <p>
                      <strong>
                        Incident ID:
                      </strong>{" "}
                      {incident.id}
                    </p>

                    <p>
                      <strong>
                        User ID:
                      </strong>{" "}
                      {incident.user_id ||
                        "Unknown"}
                    </p>

                    <p>
                      <strong>
                        Description:
                      </strong>{" "}
                      {incident.description ||
                        "None"}
                    </p>

                    <p>
                      <strong>
                        Location:
                      </strong>{" "}
                      {incident.latitude},{" "}
                      {incident.longitude}
                    </p>

                    <p>
                      <strong>
                        Reported:
                      </strong>{" "}
                      {incident.created_at
                        ? new Date(
                            incident.created_at
                          ).toLocaleString()
                        : "Unknown"}
                    </p>

                  </div>


                  {/* ACTIONS */}

                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      flexWrap: "wrap",
                      marginTop: "15px"
                    }}
                  >

                    <button
                      disabled={
                        updatingId ===
                        incident.id
                      }
                      onClick={() =>
                        updateStatus(
                          incident.id,
                          "Acknowledged"
                        )
                      }
                      style={{
                        padding:
                          "10px 15px",
                        border: "none",
                        borderRadius:
                          "7px",
                        background:
                          "#f57c00",
                        color: "white",
                        cursor:
                          "pointer",
                        fontWeight:
                          "bold"
                      }}
                    >
                      {updatingId ===
                      incident.id
                        ? "Updating..."
                        : "✅ Acknowledge"}
                    </button>


                    <button
                      disabled={
                        updatingId ===
                        incident.id
                      }
                      onClick={() =>
                        updateStatus(
                          incident.id,
                          "Responding"
                        )
                      }
                      style={{
                        padding:
                          "10px 15px",
                        border: "none",
                        borderRadius:
                          "7px",
                        background:
                          "#1976d2",
                        color: "white",
                        cursor:
                          "pointer",
                        fontWeight:
                          "bold"
                      }}
                    >
                      🚓 Responding
                    </button>


                    <button
                      disabled={
                        updatingId ===
                        incident.id
                      }
                      onClick={() =>
                        updateStatus(
                          incident.id,
                          "Resolved"
                        )
                      }
                      style={{
                        padding:
                          "10px 15px",
                        border: "none",
                        borderRadius:
                          "7px",
                        background:
                          "#2e7d32",
                        color: "white",
                        cursor:
                          "pointer",
                        fontWeight:
                          "bold"
                      }}
                    >
                      ✔️ Resolve
                    </button>

                  </div>

                </div>

              );

            })}

          </div>

        )}

      </div>

    </div>

  );
}

export default SecurityDashboard;
