import React from "react";
import { useMap, useMapEvents } from "react-leaflet";
import { divIcon } from "leaflet";
import Triangle from "../../assets/icons/triangle.svg";
import styled from "styled-components";
import GlobalContext from "../../context/GlobalContext";

const LocateContainer = styled.div`
  position: fixed;
  z-index: 10000000;
  right: 1rem;
  bottom: 1rem;
  width: 50px;
  height: 50px;
`;

const MapLocate = () => {
  const { geoLocation } = React.useContext(GlobalContext);
  const map = useMap();
  const handleLocate = () => {
    map.setView(geoLocation, 17);
  };

  return <LocateContainer onClick={handleLocate}>test</LocateContainer>;
};

export default MapLocate;
