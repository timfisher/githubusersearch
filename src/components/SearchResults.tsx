import { User } from "../generated/graphql";

import {
  SearchUserQuery,
  SearchUserVariables,
  GET_SEARCH_INPUT_VALUE,
  SEARCH_USER_QUERY,
  GetSearchInputValueData,
} from "../apollo/queries";

import { useQuery } from "@apollo/client";

import RepositoryList from "./RepositoryList";
import styled from "styled-components";
import { users } from "../apollo/cache";

interface UserListProps {
  maxUsers: number;
  maxRepositories: number;
}

const SearchResultsContainer = ({
  maxUsers,
  maxRepositories,
}: UserListProps) => {
  const { data: user } = useQuery<GetSearchInputValueData>(
    GET_SEARCH_INPUT_VALUE
  );

  const {
    loading,
    error,
    data: searchResults,
  } = useQuery<SearchUserQuery, SearchUserVariables>(SEARCH_USER_QUERY, {
    variables: {
      user: user?.searchInputValue ?? "",
      maxUsers,
      maxRepositories,
    },
  });
  const usersData = searchResults?.search?.nodes?.filter(
    (node) => node?.__typename === "User"
  ) as User[];
  users(usersData);

  if (loading) return <p>Loading ...</p>;
  if (error) return <p>An error has occurred fetching the data</p>;
  if (searchResults?.search.nodes?.length === 0) {
    return <p>No users found</p>;
  }

  return <SearchResults users={usersData} />;
};

interface SearchResultData {
  users: User[];
}

const SearchResults = ({ users }: SearchResultData) => {
  return (
    <StyledSearchResults>
      {users.map(
        ({ avatarUrl, login, name, repositories: { nodes: repositories } }) => (
          <StyledUserListItem>
            <StyledImage
              src={avatarUrl}
              alt={`${login} avatar`}
              width="200px"
              height="200px"
            />
            <h2>{login}</h2>
            <h3>{name}</h3>
            <RepositoryList
              key={`${login}repositories`}
              repositories={repositories}
            />
          </StyledUserListItem>
        )
      )}
    </StyledSearchResults>
  );
};

export const StyledImage = styled.img`
  border-radius: 50%;
`;

export const StyledSearchResults = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-template-rows: auto auto;
  grid-gap: 5px;
  width: 1000px;
`;

export const StyledUserListItem = styled.div`
  grid-template-rows: auto;
  flex-direction: column;
  justify-content: center;
  padding: 0.5rem;
`;
export default SearchResultsContainer;
