import React from "react";
import styled from "styled-components";

const Overlay = styled.div`
  position: absolute;
  background: rgba(1, 1, 1, 0.5);
  width: 100vw;
  height: 100vh;
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-items: center;
`;

const OverlayModal = styled.div`
  margin: auto;
  width: 300px;
  min-height: 100px;
  padding: 1rem;
  background: #fff;
  text-align: center;
  border-radius: 0.5rem;
`;

const OverlayHeader = styled.h1`
  text-align: center;
`;

const OverlayView = () => {
  return (
    <Overlay>
      <OverlayModal>
        <OverlayHeader>Geolocation is turned off :(</OverlayHeader>
        <h3>
          You have to turn Geolocation on in order to use the functionality
        </h3>
      </OverlayModal>
    </Overlay>
  );
};
export default OverlayView;
