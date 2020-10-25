import gql from "graphql-tag";

export default gql`
  query getStopTimetable($id: String!, $omitNonPickups: Boolean) {
    stop(id: $id, omitNonPickups: $omitNonPickups) {
      name
      code
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
          directionId
          route {
            shortName
            stops {
              name
            }
          }
        }
      }
    }
  }
`;
