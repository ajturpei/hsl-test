import React, { useMemo, useRef } from "react";
import {
  MapContainer as LeafletMap,
  TileLayer,
  Marker,
  useMap,
} from "react-leaflet";
import GlobalContext from "../../context/GlobalContext";
import styled from "styled-components";
import MapStops from "./MapStops";
import Stops from "./Stops";
import RouteOnMap from "./RouteOnMap";
import config from "../../utils/config";
import Vehicle from "./Vehicle";
import MapLocate from "./MapLocate";

const { hslMap, initialPositionCoords, subscriptionKey } = config;
const MapContainer = styled.div`
  width: 100%;
  height: 100vh;
`;

const MapMarker = () => {
  const { geoLocation, setGeoLocation } = React.useContext(GlobalContext);
  const map = useMap();
  const markerRef = useRef<any | null>(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setGeoLocation(marker.getLatLng());
        }
      },
    }),
    [setGeoLocation]
  );
  React.useEffect(() => {
    map.locate();
    map.on("locationfound", (e) => {
      map.setView(e.latlng, 17);
    });
  }, [map]);

  return (
    <Marker
      position={geoLocation}
      draggable
      ref={markerRef}
      eventHandlers={eventHandlers}
    />
  );
};

const MapOverlay = () => {
  const mapUl = `${hslMap}?digitransit-subscription-key=${subscriptionKey}`;
  return (
    <MapContainer>
      <LeafletMap center={initialPositionCoords} zoom={17}>
        <TileLayer
          url={mapUl}
          tileSize={256}
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapMarker />
        <MapStops />
        <Stops />
        <RouteOnMap />
        <Vehicle />
        <MapLocate />
      </LeafletMap>
    </MapContainer>
  );
};

export default MapOverlay;
