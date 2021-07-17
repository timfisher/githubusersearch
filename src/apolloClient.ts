import {
  ApolloLink,
  ApolloClient,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";

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

const cache = new InMemoryCache({});

export const useAppApolloClient = () => {
  const authToken = "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";
  return new ApolloClient({
    link: authMiddleware(authToken).concat(httpLink),
    cache,
  });
};
