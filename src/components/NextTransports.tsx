import React from "react";
import styled from "styled-components";
import StopInformation from "./StopInformation";

const TransportInfoContainer = styled.div`
  margin-top: 0.5rem;
`;

const TransportInfoHeader = styled.div`
  font-size: ${(p) => p.theme.fontSize.base};
  font-weight: ${(p) => p.theme.fontWeight.medium};
  text-align: center;
`;

const NextTransports = ({ stopData }: any) => {
  return (
    <TransportInfoContainer>
      <TransportInfoHeader>Departures (realtime)</TransportInfoHeader>
      {stopData.stoptimesWithoutPatterns.map(
        (stopInformation: any, index: number) => (
          <StopInformation
            key={`stopInfo-${index}`}
            stopInformation={stopInformation}
            vehicleType={stopData.vehicleType}
          />
        )
      )}
    </TransportInfoContainer>
  );
};
export default NextTransports;
