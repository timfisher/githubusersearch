import { gql } from "@apollo/client";
import { Maybe, Repository, User } from "./generated/graphql";

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
                          "name" | "stargazerCount" | "watchers"
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

export interface SearchUserVariables {
  user: string;
  maxUsers: number;
  maxRepositories: number;
}

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
