import React from "react";
import { Circle, CircleProps, Popup } from "react-leaflet";
import theme from "../../themes/theme";
import styled from "styled-components";
import NextTransports from "../NextTransports";
import { getTransportationType } from "../../utils/dataUtils";
import { StopProps } from "../../types/hslDataTypes";

interface MyCircleProps extends CircleProps {
  stopData: StopProps;
  closest: boolean;
  distance: number;
  stopId: string;
}

const DistanceContainer = styled.div<{ borderColor: string }>`
  padding-bottom: 0.5rem;
  border-bottom: 2px solid ${(p) => p.borderColor};
  text-align: center;
  font-size: ${(p) => p.theme.fontSize.small};
  color: ${(p) => p.theme.color.blackLighter};
  font-weight: ${(p) => p.theme.fontWeight.light};
`;

const StopInformation = styled.div`
  margin-top: 0.5rem;
  font-weight: ${(p) => p.theme.fontWeight.medium};
`;

const StopHeader = styled.h2`
  text-align: center;
  margin-bottom: 0;
`;

const StopMapCircle = ({
  center,
  radius,
  stopData,
  closest,
  distance,
  stopId,
}: MyCircleProps) => {
  const transportationType = getTransportationType(stopData.vehicleType);
  const { code, name } = stopData;

  return (
    <Circle
      center={center}
      radius={radius}
      color={theme.color.blackLighter}
      opacity={1}
      fillColor={transportationType.color}
      fillOpacity={0.7}
    >
      <Popup
        direction="right"
        opacity={1}
        permanent={closest}
        maxWidth={320}
        minWidth={250}
      >
        <StopInformation>
          <StopHeader>{name}</StopHeader>
          <DistanceContainer borderColor={transportationType.color}>
            {distance} m ({transportationType.transportName}) ({code})
          </DistanceContainer>
          <div>
            <NextTransports stopData={stopData} />
          </div>
        </StopInformation>
      </Popup>
    </Circle>
  );
};

export default StopMapCircle;
