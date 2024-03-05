import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    createHttpLink,
  } from "@apollo/client";
  import { setContext } from "@apollo/client/link/context";
  import { onError } from "@apollo/client/link/error";
  import * as SecureStore from "expo-secure-store";
  import { PropsWithChildren } from "react";
  
  
  const httpLink = createHttpLink({
    uri: "http://192.168.18.204:4500/graphql",
  });
  
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
  
  export const client = new ApolloClient({
    link: errorLink.concat(authLink).concat(httpLink),
    cache: new InMemoryCache(),
  });
  
  function ApolloClientProvider({ children }: PropsWithChildren<{}>) {
    return <ApolloProvider client={client}>{children}</ApolloProvider>;
  }
  
  export default ApolloClientProvider;