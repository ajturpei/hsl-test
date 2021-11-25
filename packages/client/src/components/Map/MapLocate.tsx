import React from "react";
import { useMap } from "react-leaflet";
import Location from "../../assets/icons/location.svg";
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

const Image = styled.img`
  width: 50px;
  height: 50px;
`;

const MapLocate = () => {
  const { geoLocation } = React.useContext(GlobalContext);
  const map = useMap();
  const handleLocate = () => {
    map.setView(geoLocation, 17);
  };

  return (
    <LocateContainer onClick={handleLocate}>
      <Image src={Location} alt="show my location" />
    </LocateContainer>
  );
};

export default MapLocate;
