import gql from "graphql-tag";

export default gql`
  query getStopsData($ids: [String]) {
    stops(ids: $ids) {
      gtfsId
      name
      code
      locationType
      vehicleType
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
