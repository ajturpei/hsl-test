import React from "react";
import { Map as LeafletMap, TileLayer, Marker } from "react-leaflet";
import GlobalContext from "../../context/GlobalContext";
import styled from "styled-components";
import MapStops from "./MapStops";
import RouteOnMap from "./RouteOnMap";
import config from "../../utils/config";
import { LatLngExpression } from "leaflet";

const MapContainer = styled.div`
  width: 100%;
  height: 100vh;
`;

const MapOverlay = () => {
  const { initialLocation } = React.useContext(GlobalContext);
  const mapRef: any = React.useRef();
  const position: LatLngExpression = [initialLocation.lat, initialLocation.lng];
  return (
    <MapContainer>
      <LeafletMap ref={mapRef} center={position} zoom={17}>
        <TileLayer
          url={`https://tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=${config.apiKey}`}
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position} />
        <MapStops />
        <RouteOnMap />
      </LeafletMap>
    </MapContainer>
  );
};

export default MapOverlay;
