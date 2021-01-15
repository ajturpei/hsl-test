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

const Button = styled.button`
  background: ${(p) => p.theme.color.hslGreen};
  color: ${(p) => p.theme.color.white};
  padding: 0.5rem 1.5rem;
  font-weight: 700;
  font-size: 1.2rem;
  border-radius: 0.25rem;
  border: none;
`;

const OverlayView = () => {
  const handleRefresh = () => {
    window.location.reload();
  };
  return (
    <Overlay>
      <OverlayModal>
        <OverlayHeader>Geolocation is turned off :(</OverlayHeader>
        <h3>
          You have to turn Geolocation on in order to use the functionality.
        </h3>
        <Button onClick={handleRefresh}>Refresh</Button>
      </OverlayModal>
    </Overlay>
  );
};
export default OverlayView;
