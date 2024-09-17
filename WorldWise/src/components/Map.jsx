import { useNavigate, useSearchParams } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
  useMapEvents,
} from "react-leaflet";
import styles from "./Map.module.css";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CiteisContext";
import { useGeolocation } from "../hooks/useGeolocation";
import Button from "./Button";
import { useURLPosition } from "../hooks/useURLPosition";
function Map() {
  const { cities } = useCities(); // read the cities from the context
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const {
    isLoading: isLoadingGeolocation,
    position: geolocation,
    getPosition,
  } = useGeolocation(); // get the current location
  const [mapLat, mapLng] = useURLPosition();

  useEffect(
    function () {
      if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    },
    [mapLat, mapLng]
  );

  // sync geolocation with the position centered on the Map.
  useEffect(
    function () {
      if (geolocation) setMapPosition([geolocation.lat, geolocation.lng]);
    },
    [geolocation]
  );
  return (
    <div className={styles.mapContainer}>
      {/* custom button component to get the current location  */}
      {!geolocation && (
        <Button type="position" onClick={getPosition}>
          {isLoadingGeolocation ? "Loading..." : "Use your position "}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span> <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

/* eslint-disable react/prop-types */
function ChangeCenter({ position }) {
  const map = useMap(); // use Map hook to get the instance of the current displayed map
  map.setView(position, 6); // change the center of the map to the given position
  return null; // return null since we don't want this component to display something on the UI
}

function DetectClick() {
  const navigate = useNavigate(); // Navigation
  useMapEvents({
    click: (e) => {
      // get the coordinates of the point from the event  leaflet event
      const pointLat = e.latlng.lat;
      const pointLng = e.latlng.lng;
      navigate(`form?lat=${pointLat}&lng=${pointLng}`);
    },
  });
}
export default Map;
