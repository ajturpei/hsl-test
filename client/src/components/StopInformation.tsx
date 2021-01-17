import React from "react";
import styled, { keyframes, css } from "styled-components";
import {
  getTime24h,
  getTransportationType,
  getMinutes,
} from "../utils/dataUtils";
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

export const blink = css`
  animation: ${fadeInOut} 2s linear infinite;
`;

const ScheduleIndicator = styled.span<{
  isDelayed: boolean;
  isRealtime: boolean;
}>`
  font-size: ${(p) => p.theme.fontSize.h2};
  color: ${(p) => (p.isDelayed ? "red" : "green")};
  margin-right: 0.25rem;
  margin-top: 2px;
  ${(p) => p.isRealtime && blink};
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

const Delay = styled.span`
  display: block;
  font-size: ${(p) => p.theme.fontSize.xsmall};
  color: ${(p) => p.theme.color.grayLight};
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

const getVehicleValues = (vehicleData: string, vehicleType: number) => {
  const splittedId = vehicleData.split("_");
  const vehicleCode = splittedId[0].split(":")[1];
  const direction = splittedId[3];
  return { vehicleType, direction, vehicleCode };
};

const StopInformation = ({
  stopInformation,
  vehicleType,
  isFirst,
}: {
  stopInformation: StopTimesProps;
  vehicleType: number;
  isFirst: boolean;
}) => {
  const encodedCoordinates: string = stopInformation.trip.tripGeometry.points;
  const { setCurrentRoute, setVehicleData } = React.useContext(GlobalContext);
  const { color } = getTransportationType(vehicleType);
  const {
    realtime,
    realtimeDeparture,
    headsign,
    arrivalDelay,
  } = stopInformation;
  const { gtfsId: vehicleCoding = "" } = stopInformation.trip;
  const { shortName: lineNumber } = stopInformation.trip.route;
  const isDelayed: boolean = arrivalDelay > 0;
  const delay = isDelayed && getMinutes(arrivalDelay);
  const realtimeDepartureTime = getTime24h(realtimeDeparture);
  React.useEffect(() => {
    if (isFirst) {
      const vehicleDataObj = getVehicleValues(vehicleCoding, vehicleType);
      setVehicleData(vehicleDataObj);
    }
  }, [isFirst, setVehicleData, vehicleCoding, vehicleType]);

  const handleSetRoute = () => {
    setCurrentRoute({ color, coordinates: encodedCoordinates });
  };

  return (
    <StopInformationContainer onClick={handleSetRoute}>
      <ShowRoute>show route</ShowRoute>
      <ScheduleIndicator isDelayed={isDelayed} isRealtime={realtime}>
        •
      </ScheduleIndicator>
      <Time>
        {realtimeDepartureTime} {delay && <Delay>~{delay} late</Delay>}
      </Time>
      <LineAndHeadSignContainer>
        <LineNumber>{lineNumber}</LineNumber>
        <HeadSign>{headsign}</HeadSign>
      </LineAndHeadSignContainer>
    </StopInformationContainer>
  );
};

export default StopInformation;
