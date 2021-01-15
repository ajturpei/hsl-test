import gql from "graphql-tag";

export default gql`
  subscription getRealtimeVehicleData($topic: String!) {
    subscribe2vehicleData(topic: $topic) {
      spd
      hdg
      lat
      long
      start
    }
  }
`;
