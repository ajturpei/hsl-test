const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type VehicleData {
    start: String!
    spd: Float!
    hdg: Int!
    lat: Float!
    long: Float!
  }
  type Subscription {
    subscribe2vehicleData(topic: String!): VehicleData!
  }
  type VehicleDetails {
    id: String!
  }
  type Query {
    vehicle: VehicleDetails!
  }
  schema {
    query: Query
    subscription: Subscription
  }
`;

module.exports = { typeDefs };
