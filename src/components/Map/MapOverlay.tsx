import React from "react";
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

const MapContainer = styled.div`
  width: 100%;
  height: 100vh;
`;

const MapMarker = () => {
  const { geoLocation } = React.useContext(GlobalContext);
  const map = useMap();
  React.useEffect(() => {
    map.locate();
    map.on("locationfound", (e) => {
      map.setView(e.latlng, 17);
    });
  }, [map]);
  return <Marker position={geoLocation} />;
};

const MapOverlay = () => {
  const { hslMap, initialPositionCoords } = config;

  return (
    <MapContainer>
      <LeafletMap center={initialPositionCoords} zoom={17}>
        <TileLayer
          url={hslMap}
          tileSize={256}
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapMarker />
        <MapStops />
        <Stops />
        <RouteOnMap />
        <Vehicle />
      </LeafletMap>
    </MapContainer>
  );
};

export default MapOverlay;
