import gql from "graphql-tag";

export default gql`
  query getStops($ids: [String]) {
    stops(ids: $ids) {
      gtfsId
      name
      lat
      lng: lon
      stoptimesWithoutPatterns {
        scheduledArrival
        realtimeArrival
        arrivalDelay
        scheduledDeparture
        realtimeDeparture
        departureDelay
        realtime
        realtimeState
        serviceDay
        pickupType
        headsign
        trip {
          id
        }
      }
    }
  }
`;
