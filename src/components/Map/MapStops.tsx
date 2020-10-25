import React from "react";
import { useQuery } from "@apollo/client";
import getStopsByRadius from "../../graphql/queries/getStopsRadius";
import GlobalContext from "../../context/GlobalContext";
import StopMapCircle from "./StopMapCircle";

interface QueryArgs {
  lat: number;
  lon: number;
  radius: number;
  first?: number;
}
const MapStops = () => {
  const { initialLocation, radiusInMeters } = React.useContext(GlobalContext);
  // TODO response args
  const { loading, error, data } = useQuery<any, QueryArgs>(getStopsByRadius, {
    variables: {
      lat: initialLocation.lat,
      lon: initialLocation.lng,
      radius: radiusInMeters,
      first: 10,
    },
    pollInterval: 30000, // request every 30 sec
    skip: initialLocation.lat === 0 || initialLocation.lng === 0,
  });

  const usedGtfsId: string[] = [];
  let stops: any = [];
  if (loading || error) {
    return <></>;
  }
  if (data) {
    stops = data.stopsByRadius.edges;
  }

  return stops?.map(({ node }: any, index: number) => {
    const stopData = node.stop;
    const { gtfsId, lat, lng } = stopData;
    const distance = node.distance;
    // TODO: filter duplicates (!!) in data out before map
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
  });
};

export default MapStops;
