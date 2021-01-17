import React from "react";
import GlobalContext, {
  LocationProps,
  RouteProps,
  VehicleProps,
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

  const [stopData, setStopData] = React.useState<any>(null);
  const [vehicleData, setVehicleData] = React.useState<VehicleProps>({
    vehicleType: -1,
    direction: "",
    vehicleCode: "",
  });

  const GlobalContextData = {
    initialLocation,
    setInitialLocation,
    geoLocation,
    setGeoLocation,
    radiusInMeters,
    setRadiusInMeters,
    currentRoute,
    setCurrentRoute,
    stopData,
    setStopData,
    vehicleData,
    setVehicleData,
  };

  return (
    <GlobalContext.Provider value={GlobalContextData}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextComponent;
