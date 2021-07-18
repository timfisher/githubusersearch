import {
  ApolloLink,
  ApolloClient,
  HttpLink,
  NormalizedCacheObject,
} from "@apollo/client";

import { cache, typeDefs } from "./cache";

const httpLink = new HttpLink({ uri: "https://api.github.com/graphql" });

const authMiddleware = (authToken: string) =>
  new ApolloLink((operation, forward) => {
    operation.setContext({
      headers: {
        authorization: `Bearer ${authToken}`,
      },
    });

    return forward(operation);
  });

export const useAppApolloClient = () => {
  const authToken = process.env.REACT_APP_GITHUB_AUTHTOKEN ?? "";
  return new ApolloClient<NormalizedCacheObject>({
    link: authMiddleware(authToken).concat(httpLink),
    cache,
    typeDefs,
  });
};
