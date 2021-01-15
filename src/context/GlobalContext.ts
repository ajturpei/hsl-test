import React from "react";

export interface LocationProps {
  lat: number;
  lng: number;
}

export interface RouteProps {
  color: string | null;
  coordinates: string | null;
  gtfsId?: string;
}

export interface VehicleProps {
  vehicleType: number;
  direction: string;
  vehicleCode: string;
}

interface AppContextProps {
  initialLocation: LocationProps;
  setInitialLocation: React.Dispatch<React.SetStateAction<LocationProps>>;
  geoLocation: LocationProps;
  setGeoLocation: React.Dispatch<React.SetStateAction<LocationProps>>;
  radiusInMeters: number;
  setRadiusInMeters: React.Dispatch<React.SetStateAction<number>>;
  currentRoute: RouteProps;
  setCurrentRoute: React.Dispatch<React.SetStateAction<RouteProps>>;
  stopData: any;
  setStopData: React.Dispatch<React.SetStateAction<any>>;
  setVehicleData: React.Dispatch<React.SetStateAction<VehicleProps>>;
  vehicleData: VehicleProps;
}

const GlobalContext = React.createContext<AppContextProps>({
  /* tslint:disable:no-empty */
  initialLocation: { lat: 0, lng: 0 },
  setInitialLocation: (): void => {},
  geoLocation: { lat: 0, lng: 0 },
  setGeoLocation: (): void => {},
  radiusInMeters: 0,
  setRadiusInMeters: (): void => {},
  currentRoute: { color: null, coordinates: null },
  setCurrentRoute: (): void => {},
  setStopData: (): void => {},
  stopData: null,
  setVehicleData: (): void => {},
  vehicleData: { vehicleType: -1, direction: "", vehicleCode: "" },
});

export default GlobalContext;
