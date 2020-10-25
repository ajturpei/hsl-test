export interface StopProps {
  gtfsId: string;
  name: string;
  code: number;
  locationType: number;
  vehicleType: number;
  lat: number;
  lng: number;
  distance: number;
  stoptimesWithoutPatterns: StopTimesProps;
}
export interface StopTimesProps {
  scheduledArrival: number;
  realtimeArrival: number;
  arrivalDelay: number;
  scheduledDeparture: number;
  realtimeDeparture: number;
  departureDelay: number;
  realtime: string;
  realtimeState: string;
  headsign: string;
  trip: TripProps;
}
export interface TripProps {
  id: string;
  directionId: number;
  tripGeometry: TripGeometryProps;
  route: RouteProps;
}

export interface TripGeometryProps {
  length: number;
  points: string;
}
export interface RouteProps {
  shortName: string;
  stops: {
    name: string;
    gtfsId: string;
  };
}
