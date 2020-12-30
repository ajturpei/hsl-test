import React from "react";
import GlobalContext from "../../context/GlobalContext";
import StopMapCircle from "./StopMapCircle";
import { EdgesProps } from "../../types/hslDataTypes";
const Stops = () => {
  const { stopData } = React.useContext(GlobalContext);
  let usedGtfsId: any = [];
  if (stopData) {
    return stopData?.stopsByRadius?.edges?.map(
      ({ node }: EdgesProps, index: number) => {
        const stopData = node.stop;
        const { gtfsId, lat, lng } = stopData;
        const distance = node.distance;
        if (usedGtfsId.indexOf(gtfsId) !== -1) {
          return undefined;
        }
        usedGtfsId.push(gtfsId);
        return (
          <StopMapCircle
            key={gtfsId}
            stopId={stopData.gtfsId}
            center={[lat, lng]}
            radius={6}
            stopData={stopData}
            closest={index === 0}
            distance={distance}
          />
        );
      }
    );
  }
  return <></>;
};

export default Stops;
