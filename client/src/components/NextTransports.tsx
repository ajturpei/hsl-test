import React from "react";
import styled from "styled-components";
import StopInformation from "./StopInformation";
import { StopProps, StopTimesProps } from "../types/hslDataTypes";

const TransportInfoContainer = styled.div`
  padding: 0.5rem 0 1.5rem;
`;

const NextTransports = ({ stopData }: { stopData: StopProps }) => {
  return (
    <TransportInfoContainer>
      {stopData?.stoptimesWithoutPatterns?.map(
        (stopInformation: StopTimesProps, index: number) => (
          <StopInformation
            key={`stopInfo-${index}`}
            isFirst={index === 0}
            stopInformation={stopInformation}
            vehicleType={stopData.vehicleType}
          />
        )
      )}
    </TransportInfoContainer>
  );
};
export default NextTransports;
