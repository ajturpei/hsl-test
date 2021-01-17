import React from "react";
import { Circle, CircleProps, Popup } from "react-leaflet";
import { useLazyQuery } from "@apollo/client";
import theme from "../../themes/theme";
import styled from "styled-components";
import NextTransports from "../NextTransports";
import {
  getTransportationType,
  getIconForVehicleType,
} from "../../utils/dataUtils";
import { StopProps } from "../../types/hslDataTypes";
import getStopTimetable from "../../graphql/queries/getStopTimetable";
import { blink } from "../StopInformation";

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

const IconImg = styled.img`
  display: block;
  width: 2rem;
  height: 2rem;
  margin: 0.25rem auto;
`;

const TransportInfoHeader = styled.div`
  margin-top: 0.25rem;
  font-size: ${(p) => p.theme.fontSize.small};
  color: ${(p) => p.theme.color.grayLight};
  text-align: center;
`;

const Blink = styled.span`
  ${blink};
`;

const NoBlink = styled(Blink)`
  animation: none;
`;

const RenderPopup = ({
  stopId,
  distance,
  name,
  vehicleType,
  code,
}: {
  stopId: string;
  distance: number;
  name: string;
  code: string;
  vehicleType: number;
}) => {
  const [fetchStopData, { loading, error, data, stopPolling }] = useLazyQuery<
    any,
    any
  >(getStopTimetable, {
    fetchPolicy: "no-cache",
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

  const Icon = getIconForVehicleType(vehicleType);
  const { color: vehicleTypeColor } = getTransportationType(vehicleType);

  return (
    <Popup
      maxWidth={320}
      minWidth={250}
      onOpen={fetchStopData}
      onClose={stopFetching}
      autoPan={false}
    >
      {loading && <div>Loading...</div>}
      {error && <div>Error fetching info</div>}
      <StopInformation>
        <StopHeader>
          <IconImg src={Icon} />
          {name}
        </StopHeader>
        <DistanceContainer borderColor={vehicleTypeColor}>
          {distance} m ({code})
        </DistanceContainer>
        <div>{data && <NextTransports stopData={data.stop} />}</div>
        <TransportInfoHeader>
          <div>
            <Blink>•</Blink> Realtime Departure
          </div>
          <NoBlink>•</NoBlink> Scheduled departure
        </TransportInfoHeader>
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
  const { name, code, platformCode, vehicleType } = stopData;
  const transportationType = getTransportationType(vehicleType);
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
        code={platformCode || code}
        vehicleType={vehicleType}
      />
    </Circle>
  );
};

export default StopMapCircle;
