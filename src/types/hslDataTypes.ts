export interface EdgesProps {
  node: { stop: StopProps; distance: number };
}

export interface StopProps {
  gtfsId: string;
  name: string;
  code: string;
  locationType: number;
  vehicleType: number;
  platformCode: string;
  lat: number;
  lng: number;
  distance: number;
  stoptimesWithoutPatterns: StopTimesProps[];
}
export interface StopTimesProps {
  scheduledArrival: number;
  realtimeArrival: number;
  arrivalDelay: number;
  scheduledDeparture: number;
  realtimeDeparture: number;
  departureDelay: number;
  realtime: boolean;
  realtimeState: string;
  headsign: string;
  trip: TripProps;
}
export interface TripProps {
  id: string;
  directionId: number;
  tripGeometry: TripGeometryProps;
  route: RouteProps;
  gtfsId?: string;
}

export interface TripGeometryProps {
  length: number;
  points: string;
}
export interface RouteProps {
  shortName: string;
  gtfsId: string;
  stops: {
    name: string;
    gtfsId: string;
  };
}
