import { ApolloClient, InMemoryCache } from "@apollo/client";
export { gql } from "@apollo/client";

export const apolloClient = new ApolloClient({
  uri: "https://webservices.jumpingcrab.com/graphql",
  cache: new InMemoryCache(),
});
