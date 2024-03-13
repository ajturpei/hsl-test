import React from "react";
import ReactDOMServer from "react-dom/server";
import { Marker } from "react-leaflet";
import { divIcon } from "leaflet";
import GlobalContext from "../../context/GlobalContext";
import { useSubscription } from "@apollo/client";
import getRealtimeVehicleData from "../../graphql/subscriptions/getRealtimeVehicleData";
import { getIconForVehicleType } from "../../utils/dataUtils";
import Triangle from "../../assets/icons/triangle.svg";
import styled from "styled-components";

const Image = styled.img<{ moving: boolean }>`
  opacity: ${(p) => !p.moving && 0.6};
  width: 30px;
  height: auto;
  border: none;
  background: none;
`;

const Image2 = styled.img<{ degrees: number; moving: boolean }>`
  opacity: ${(p) => !p.moving && 0.6};
  transform: rotate(${(p) => p.degrees}deg);
  position: absolute;
  margin-left: 10px;
  margin-top: -27px;
  width: 9px;
  height: 9px;
`;

const Vehicle = () => {
  const { vehicleData } = React.useContext(GlobalContext);
  const { vehicleCode, direction, vehicleType } = vehicleData;
  const SvgIcon = getIconForVehicleType(vehicleType);
  const subscriptions: any = React.useRef({});
  const prevVehicleCode = React.useRef<string | null>(null);
  const topic = `/hfp/v2/journey/+/vp/+/+/+/${vehicleCode}/+/#`;
  const { data } = useSubscription(getRealtimeVehicleData, {
    variables: { topic },
    shouldResubscribe: vehicleCode + direction !== prevVehicleCode?.current,
  });

  if (!data) {
    subscriptions.current = {};
  }

  React.useEffect(() => {
    prevVehicleCode.current = vehicleCode + direction;
  }, [vehicleCode, vehicleData, direction]);

  React.useEffect(() => {
    if (data) {
      const { lat, long, start, hdg, spd } = data?.subscribe2vehicleData;
      subscriptions.current = {
        ...subscriptions.current,
        [start]: {
          lat,
          long,
          hdg,
          spd,
        },
      };
    } else {
      subscriptions.current = {};
    }
  }, [data]);

  return (
    <>
      {Object.keys(subscriptions.current).map((key: string) => {
        const { lat, long, hdg, spd } = subscriptions.current[key];
        const icon = divIcon({
          html: ReactDOMServer.renderToString(
            <>
              <Image src={SvgIcon} alt='vehicle' moving={spd > 1} />
              <Image2
                src={Triangle}
                alt='vehicle'
                degrees={hdg}
                moving={spd > 1}
              />
            </>
          ),
          className: "vehicle",
          iconSize: [0, 0],
          shadowSize: [0, 0],
          iconAnchor: [7, 10],
        });
        const vehicleCoords = { lat, lng: long };
        return <Marker key={key} position={vehicleCoords} icon={icon} />;
      })}
    </>
  );
};

export default Vehicle;
