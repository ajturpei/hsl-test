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
        headsign
        trip {
          id
          directionId
          tripGeometry {
            length
            points
          }
          route {
            gtfsId
            shortName
            stops {
              name
              gtfsId
            }
          }
        }
      }
    }
  }
`;
