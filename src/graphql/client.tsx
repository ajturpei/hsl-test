import { ApolloClient, InMemoryCache } from "@apollo/client";
import config from "../utils/config";

const client = new ApolloClient({
  uri: config.graphqlAPI,
  cache: new InMemoryCache(),
});

export default client;
