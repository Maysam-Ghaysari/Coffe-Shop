"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet"; // اضافه کردن لایبرری لِفلت
import "leaflet/dist/leaflet.css";
import styles from "./map.module.css";

// فیکس کردن مشکل نمایش آیکون در Next.js
const customIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function Map({ position, center, children }) {
  return (
    <div className={styles.mapWrapper}>
      <MapContainer
        className={styles.map}
        center={center}
        zoom={14}
        scrollWheelZoom={false} // در حالت موبایل بهتر است false باشد تا اسکرول صفحه مختل نشود
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={customIcon}>
          <Popup>قهوه ست</Popup>
        </Marker>
      </MapContainer>
      <div className={styles.details}>{children}</div>
    </div>
  );
}