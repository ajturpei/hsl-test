import React from "react";
import GlobalContext, {
  LocationProps,
  RouteProps,
} from "../context/GlobalContext";
import { getDefaultRadius } from "../utils/dataUtils";

interface GlobalContextProps {
  children: React.ReactNode;
}

const initialCoords = {
  lat: 0,
  lng: 0,
};

const GlobalContextComponent = ({ children }: GlobalContextProps) => {
  const [initialLocation, setInitialLocation] = React.useState<LocationProps>(
    initialCoords
  );
  const [geoLocation, setGeoLocation] = React.useState<LocationProps>(
    initialCoords
  );
  const [radiusInMeters, setRadiusInMeters] = React.useState<number>(
    getDefaultRadius()
  );
  const [currentRoute, setCurrentRoute] = React.useState<RouteProps>({
    coordinates: null,
    color: "black",
  });

  // TODO: useReducer actions for setting new global states

  const GlobalContextData = {
    initialLocation,
    setInitialLocation,
    geoLocation,
    setGeoLocation,
    radiusInMeters,
    setRadiusInMeters,
    currentRoute,
    setCurrentRoute,
  };

  return (
    <GlobalContext.Provider value={GlobalContextData}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextComponent;