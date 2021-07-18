import {
  ApolloLink,
  ApolloClient,
  HttpLink,
  NormalizedCacheObject,
} from "@apollo/client";

import { cache, extendedTypeDefs } from "./cache";

const httpLink = new HttpLink({ uri: "https://api.github.com/graphql" });

const authMiddleware = (authToken: string) =>
  new ApolloLink((operation, forward) => {
    operation.setContext({
      headers: {
        // Bearer token auth with Git PAT
        authorization: `Bearer ${authToken}`,
      },
    });

    return forward(operation);
  });

// Apollo client with the Github Auth token from env variable.
export const useAppApolloClient = () => {
  const authToken = process.env.REACT_APP_GITHUB_AUTHTOKEN ?? "";
  return new ApolloClient<NormalizedCacheObject>({
    link: authMiddleware(authToken).concat(httpLink),
    cache,
    typeDefs: extendedTypeDefs,
  });
};
