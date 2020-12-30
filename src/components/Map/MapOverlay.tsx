import React from "react";
import { Map as LeafletMap, TileLayer, Marker } from "react-leaflet";
import GlobalContext from "../../context/GlobalContext";
import styled from "styled-components";
import MapStops from "./MapStops";
import Stops from "./Stops";
import RouteOnMap from "./RouteOnMap";
import config from "../../utils/config";
import { LatLngExpression } from "leaflet";

const MapContainer = styled.div`
  width: 100%;
  height: 100vh;
`;

const MapOverlay = () => {
  const { hslMap, initialPositionCoords } = config;
  const { geoLocation } = React.useContext(GlobalContext);
  const mapRef: any = React.useRef();
  const position: LatLngExpression =
    geoLocation.lat !== 0
      ? [geoLocation.lat, geoLocation.lng]
      : [initialPositionCoords.lat, initialPositionCoords.lng];
  return (
    <MapContainer>
      <LeafletMap ref={mapRef} center={position} zoom={17}>
        <TileLayer
          url={hslMap}
          tileSize={256}
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position} />
        <MapStops />
        <Stops />
        <RouteOnMap />
      </LeafletMap>
    </MapContainer>
  );
};

export default MapOverlay;
