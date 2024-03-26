import { ApolloClient, InMemoryCache, ApolloProvider, split, HttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import * as SecureStore from "expo-secure-store";
import { createClient } from "graphql-ws";
import { PropsWithChildren } from "react";

const graphqlUri = process.env.EXPO_PUBLIC_API_GRAPHQL_URL
const graphqlWsUri = process.env.EXPO_PUBLIC_WS_GRAPHQL_URL || "";

const httpLink = new HttpLink({
  uri: graphqlUri,
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: graphqlWsUri,
    retryAttempts: 100000, 
    lazy: true,
    connectionParams: async () => {
      const token = await SecureStore.getItemAsync("token");
      return {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      };
    },
  })
);

const authLink = setContext(async (_, { headers }) => {
  const token = await SecureStore.getItemAsync("token");

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const link = errorLink.concat(
  split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    wsLink,
    authLink.concat(httpLink)
  )
);

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

function ApolloClientProvider({ children }: PropsWithChildren<{}>) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

export default ApolloClientProvider;