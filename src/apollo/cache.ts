import { makeVar, InMemoryCache, DocumentNode, gql } from "@apollo/client";
import { typeDefs, User } from "../generated/graphql";
import { mergeTypeDefs } from "@graphql-tools/merge";

// Define typeDefs for our client side variables
const clientTypeDefs = gql`
  extend type LocalStateQuery {
    searchInputValue: String!
    users: [User!]!
  }
`;

// Merge typeDefs with code generated typeDefs
export const extendedTypeDefs: DocumentNode = mergeTypeDefs([
  typeDefs,
  clientTypeDefs,
]);

// Define client side reactive var for search input value
export const searchInputValue = makeVar<string>("");

// Define client side reactive var for users value
export const users = makeVar<User[]>([]);

// Add our reactive vars to the client side in memory cache
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
