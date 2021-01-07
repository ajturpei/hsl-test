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
            platformCode
          }
          distance
        }
      }
    }
  }
`;
