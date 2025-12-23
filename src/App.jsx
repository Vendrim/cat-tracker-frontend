import "./App.css";
import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { BrowserRouter } from "react-router-dom";

function App() {
  const position = [37.0353607, -7.8377805];

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/device/all")
      .then((res) => res.json())
      .then((json) => console.log(json));
  }, []);

  return (
    <BrowserRouter>
      <div className="main-container">
        <div className="menu-bar">
          <span>Cat Tracker</span>
        </div>
        <div className="content-container">
          <div className="content-card">
            <span>Here you can find/search your cat:</span>
          </div>
        </div>
        <MapContainer
          center={position}
          zoom={13}
          style={{ height: "400px", width: "100%" }}
        >
          <TileLayer
            attribution="© OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker position={position}>
            <Popup>Marker text</Popup>
          </Marker>
        </MapContainer>
      </div>
    </BrowserRouter>
  );
}

export default App;
