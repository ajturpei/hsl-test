import React from "react";
import { Map as LeafletMap, TileLayer, Marker } from "react-leaflet";
import GlobalContext from "../../context/GlobalContext";
import styled from "styled-components";
import MapStops from "./MapStops";
import Stops from "./Stops";
import RouteOnMap from "./RouteOnMap";
import config from "../../utils/config";
import { isEqual } from "lodash";

const MapContainer = styled.div`
  width: 100%;
  height: 100vh;
`;

const MapOverlay = () => {
  const { hslMap, initialPositionCoords } = config;
  const { geoLocation } = React.useContext(GlobalContext);
  const mapRef: any = React.useRef();
  const mapPosition: any = React.useRef(null);

  React.useEffect(() => {
    if (
      !mapPosition.current ||
      isEqual(mapPosition.current, [
        initialPositionCoords.lat,
        initialPositionCoords.lng,
      ])
    ) {
      mapPosition.current =
        geoLocation.lat !== 0
          ? [geoLocation.lat, geoLocation.lng]
          : [initialPositionCoords.lat, initialPositionCoords.lng];
    }
  }, [
    geoLocation,
    geoLocation.lat,
    geoLocation.lng,
    initialPositionCoords,
    initialPositionCoords.lat,
    initialPositionCoords.lng,
  ]);
  return (
    <MapContainer>
      <LeafletMap ref={mapRef} center={mapPosition.current} zoom={17}>
        <TileLayer
          url={hslMap}
          tileSize={256}
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={geoLocation} />
        <MapStops />
        <Stops />
        <RouteOnMap />
      </LeafletMap>
    </MapContainer>
  );
};

export default MapOverlay;
