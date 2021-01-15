import gql from "graphql-tag";

export default gql`
  query getStopTimetable($id: String!) {
    stop(id: $id) {
      name
      code
      locationType
      vehicleType
      platformCode
      stoptimesWithoutPatterns(omitNonPickups: true, omitCanceled: false) {
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
          gtfsId
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
