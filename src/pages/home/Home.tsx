import { LatLngExpression } from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Layout from "../../layouts/layout";

export default function Home() {
  const position: LatLngExpression = [37.0353607, -7.8377805];

  return (
    <Layout>
      <div className="main-container">
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
    </Layout>
  );
}
