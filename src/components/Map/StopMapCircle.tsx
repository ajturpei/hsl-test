import React from "react";
import { Circle, CircleProps, Popup } from "react-leaflet";
import { useLazyQuery } from "@apollo/client";
import theme from "../../themes/theme";
import styled from "styled-components";
import NextTransports from "../NextTransports";
import { getTransportationType } from "../../utils/dataUtils";
import { StopProps } from "../../types/hslDataTypes";
import getStopTimetable from "../../graphql/queries/getStopTimetable";

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

const RenderPopup = ({
  stopId,
  distance,
  name,
  transportationType,
  code,
}: {
  stopId: string;
  distance: number;
  name: string;
  code: number;
  transportationType: any;
}) => {
  const [fetchStopData, { loading, error, data, stopPolling }] = useLazyQuery<
    any,
    any
  >(getStopTimetable, {
    variables: {
      id: stopId,
    },
    pollInterval: 20000,
  });

  React.useEffect(() => {
    return () => {
      if (stopPolling) {
        stopPolling();
      }
    };
  }, [stopPolling]);

  const stopFetching = () => {
    if (stopPolling) {
      stopPolling();
    }
  };

  return (
    <Popup
      direction="right"
      opacity={1}
      maxWidth={320}
      minWidth={250}
      onOpen={fetchStopData}
      onClose={stopFetching}
    >
      {loading && <div>Loading...</div>}
      {error && <div>Error fetching info</div>}
      <StopInformation>
        <StopHeader>{name}</StopHeader>
        <DistanceContainer borderColor={transportationType.color}>
          {distance} m ({transportationType.transportName}) ({code})
        </DistanceContainer>
        <div>{data && <NextTransports stopData={data.stop} />}</div>
      </StopInformation>
    </Popup>
  );
};

const StopMapCircle = ({
  center,
  radius,
  stopData,
  distance,
  stopId,
}: MyCircleProps) => {
  const { name, code } = stopData;
  const transportationType = getTransportationType(stopData.vehicleType);
  return (
    <Circle
      center={center}
      radius={radius}
      color={theme.color.blackLighter}
      opacity={1}
      fillColor={transportationType.color}
      fillOpacity={0.7}
    >
      <RenderPopup
        stopId={stopId}
        distance={distance}
        name={name}
        code={code}
        transportationType={transportationType}
      />
    </Circle>
  );
};

export default StopMapCircle;
