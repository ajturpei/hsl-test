import gql from "graphql-tag";

export default gql`
  query getStopTimetable($id: String!) {
    stop(id: $id) {
      name
      code
      locationType
      vehicleType
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
