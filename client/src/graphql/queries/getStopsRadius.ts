import gql from "graphql-tag";

export default gql`
  query getStopsByRadius(
    $lat: Float!
    $lon: Float!
    $radius: Int!
    $first: Int
  ) {
    stopsByRadius(lat: $lat, lon: $lon, radius: $radius, first: $first) {
      edges {
        node {
          stop {
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
          distance
        }
      }
    }
  }
`;
