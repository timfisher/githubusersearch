import { makeVar, InMemoryCache, DocumentNode, gql } from "@apollo/client";
import { typeDefs, User } from "../generated/graphql";
import { mergeTypeDefs } from "@graphql-tools/merge";

const clientTypeDefs = gql`
  extend type LocalStateQuery {
    searchInputValue: String!
    users: [User!]!
  }
`;

export const extendedTypeDefs: DocumentNode = mergeTypeDefs([
  typeDefs,
  clientTypeDefs,
]);

export const searchInputValue = makeVar<string>("");

export const users = makeVar<User[]>([]);

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        searchInputValue: {
          read() {
            /* istanbul ignore next */
            return searchInputValue();
          },
        },
        users: {
          read() {
            /* istanbul ignore next */
            return users();
          },
        },
      },
    },
  },
});
