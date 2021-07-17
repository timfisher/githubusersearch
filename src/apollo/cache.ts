import { makeVar, gql, InMemoryCache } from "@apollo/client";
import { User } from "../generated/graphql";

export const typeDefs = gql`
  extend type Query {
    searchInputValue: String!
    users: [String!]!
  }
`;

export const searchInputValue = makeVar<string>("");

export const users = makeVar<User[]>([]);

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        searchInputValue: {
          read() {
            return searchInputValue();
          },
        },
        users: {
          read() {
            return users();
          },
        },
      },
    },
  },
});
