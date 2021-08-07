import { gql } from "@apollo/client";

/**
 * Search user query. Returns a search result with the user avatarUrl login and real name if provided
 *
 * @param cursor - If provided start at a cursor for subsequent user results
 * @param user - The username to search
 * @param maxUsers - The maximum amount of users per search of the username
 * @returns {SearchUserQuery} Search query results
 */
export const SEARCH_USER_QUERY = gql`
  query SearchUser($cursor: String, $user: String!, $maxUsers: Int!) {
    search(query: $user, type: USER, first: $maxUsers, after: $cursor) {
      nodes {
        ... on User {
          id
          avatarUrl
          login
          name
        }
      }
      pageInfo {
        startCursor
        endCursor
        hasPreviousPage
        hasNextPage
      }
    }
  }
`;

/**
 * Search user repositories query. Returns user repositories.
 *
 * @param cursor - If provided start at a cursor for subsequent user results
 * @param user - The username to search
 * @param maxUsers - The maximum amount of users per search of the username
 * @returns {SearchUserQuery} Search query results
 */
export const SEARCH_USER_REPOSITORIES_QUERY = gql`
  query SearchUserRepositories($login: String!, $first: Int!, $cursor: String) {
    repositoryOwner(login: $login) {
        repositories(after: $cursor, first: $first, orderBy: { direction: DESC, field: STARGAZERS }) {
          nodes {
            id
            description
            name
            stargazerCount
            watchers {
              totalCount      
            }
            url
          }
          pageInfo {
            startCursor
            endCursor
            hasPreviousPage
            hasNextPage
          }
        }
      }
  }
`;