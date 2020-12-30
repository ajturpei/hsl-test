import React from "react";
import { useApolloClient } from "@apollo/client";
import getStopsByRadius from "../../graphql/queries/getStopsRadius";
import GlobalContext from "../../context/GlobalContext";

interface QueryArgs {
  lat: number;
  lon: number;
  radius: number;
  first?: number;
}

const MapStops = () => {
  const { geoLocation, radiusInMeters, setStopData } = React.useContext(
    GlobalContext
  );
  const client: any = useApolloClient();

  React.useEffect(() => {
    const getStops = async () => {
      const { data: stopsResponse } = await client.query({
        query: getStopsByRadius,
        fetchPolicy: "no-cache",
        notifyOnNetworkStatusChange: true,
        variables: {
          lat: geoLocation.lat,
          lon: geoLocation.lng,
          radius: radiusInMeters,
        },
      });
      if (stopsResponse?.stopsByRadius?.edges?.length > 0) {
        setStopData(stopsResponse);
      }
    };
    getStops();
  }, [client, geoLocation.lat, geoLocation.lng, radiusInMeters, setStopData]);

  return <></>;
};

export default MapStops;
