import { gql } from "@apollo/client";
import { Maybe, Repository, User } from "../generated/graphql";

// Taken from the generated query types and modified to include more than repository name prop
export type SearchUserQuery = {
  __typename?: "Query" | undefined;
} & {
  search: {
    __typename?: "SearchResultItemConnection";
  } & {
    nodes?: Maybe<
      Array<
        Maybe<
          | {
              __typename?: "App";
            }
          | {
              __typename?: "Discussion";
            }
          | {
              __typename?: "Issue";
            }
          | {
              __typename?: "MarketplaceListing";
            }
          | {
              __typename?: "Organization";
            }
          | {
              __typename?: "PullRequest";
            }
          | {
              __typename?: "Repository";
            }
          | ({
              __typename?: "User";
            } & Pick<User, "avatarUrl" | "name"> & {
                repositories: {
                  __typename?: "RepositoryConnection";
                } & {
                  nodes?: Maybe<
                    Array<
                      Maybe<
                        {
                          __typename?: "Repository";
                        } & Pick<
                          Repository,
                          "name" | "stargazerCount" | "watchers" | "url"
                        >
                      >
                    >
                  >;
                };
              })
        >
      >
    >;
  };
};

// Variables we can use for the search query
export interface SearchUserVariables {
  // github username
  user: string;
  // maximum amount of users per search of the username
  maxUsers: number;
  // maximum amount of repositories per user returned
  maxRepositories: number;
}

/**
 * Search user query. Returns a search result with repositories and the user avatarUrl login and real name if provided
 *
 * @remarks
 * Passing more that 25 repositories tends to produce 502 due to too much data
 *
 * @param user - The username to search
 * @param maxUsers - The maximum amount of users per search of the username
 * @param first - The first number of results to return
 * @returns {SearchUserQuery} Search query results
 */
export const SEARCH_USER_QUERY = gql`
  query SearchUser($user: String!, $maxUsers: Int!, $maxRepositories: Int!) {
    search(query: $user, type: USER, first: $maxUsers) {
      nodes {
        ... on User {
          repositories(first: $maxRepositories) {
            nodes {
              name
              stargazerCount
              watchers {
                totalCount
              }
              url
            }
          }
          avatarUrl
          login
          name
        }
      }
    }
  }
`;
