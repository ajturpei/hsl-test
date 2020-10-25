import React from "react";
import styled, { keyframes } from "styled-components";
import { getTime24h, getTransportationType } from "../utils/dataUtils";
import GlobalContext from "../context/GlobalContext";
import { StopTimesProps } from "../types/hslDataTypes";

const fadeInOut = keyframes`
  0% {
    opacity: 0;
  }

  50% {
   opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const ScheduleIndicator = styled.span<{
  isDelayed: boolean;
}>`
  font-size: ${(p) => p.theme.fontSize.h2};
  color: ${(p) => (p.isDelayed ? "red" : "green")};
  animation: ${fadeInOut} 2s linear infinite;
`;

const LineNumber = styled.span`
  font-weight: ${(p) => p.theme.fontWeight.medium};
`;

const Time = styled.span`
  font-weight: ${(p) => p.theme.fontWeight.medium};
  font-size: ${(p) => p.theme.fontSize.big};
  margin-left: 0.25rem;
  width: 3rem;
`;

const HeadSign = styled.span`
  font-weight: ${(p) => p.theme.fontWeight.normal};
  color: ${(p) => p.theme.color.gray};
  font-size: ${(p) => p.theme.fontSize.small};
  white-space: nowrap;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ShowRoute = styled.div`
  color: ${(p) => p.theme.color.grayLight};
  font-size: ${(p) => p.theme.fontSize.small};
  position: absolute;
  top: 0.125rem;
  right: 0.25rem;
`;

const StopInformationContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  font-weight: ${(p) => p.theme.fontWeight.normal};
  font-size: ${(p) => p.theme.fontSize.base};
  margin-top: 0.25rem;
  background: #8080801a;
  padding: 0 0.25rem;
  ${ShowRoute} {
    opacity: 0;
  }
  &:hover {
    cursor: pointer;
    ${ShowRoute} {
      transition: all 0.2s linear;
      opacity: 1;
    }
  }
`;

const LineAndHeadSignContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex: 1 1 0;
  flex-direction: column;
  justify-content: center;
  line-height: 1.1;
  margin-left: 1rem;
`;

const StopInformation = ({
  stopInformation,
  vehicleType,
}: {
  stopInformation: StopTimesProps;
  vehicleType: number;
}) => {
  const encodedCoordinates: string = stopInformation.trip.tripGeometry.points;
  const { setCurrentRoute } = React.useContext(GlobalContext);
  const { color } = getTransportationType(vehicleType);
  const { realtimeDeparture, headsign, arrivalDelay } = stopInformation;
  const { shortName: lineNumber } = stopInformation.trip.route;
  const isDelayed: boolean = arrivalDelay > 0;
  const realtimeDepartureTime = getTime24h(realtimeDeparture);

  const handleSetRoute = () => {
    setCurrentRoute({ color, coordinates: encodedCoordinates });
  };

  return (
    <StopInformationContainer onClick={handleSetRoute}>
      <ShowRoute>show route</ShowRoute>
      <ScheduleIndicator isDelayed={isDelayed}>•</ScheduleIndicator>
      <Time>{realtimeDepartureTime}</Time>
      <LineAndHeadSignContainer>
        <LineNumber>{lineNumber}</LineNumber>
        <HeadSign>{headsign}</HeadSign>
      </LineAndHeadSignContainer>
    </StopInformationContainer>
  );
};

export default StopInformation;
