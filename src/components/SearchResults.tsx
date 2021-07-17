import { User } from "../generated/graphql";

import {
  SearchUserQuery,
  SearchUserVariables,
  SEARCH_USER_QUERY,
} from "../queries";

import { useQuery } from "@apollo/client";

import RepositoryList from "./RespositoryList";
import styled from "styled-components";

interface UserListProps {
  user: string;
  maxUsers: number;
  maxRepositories: number;
}

const SearchResultsContainer = ({
  user,
  maxUsers,
  maxRepositories,
}: UserListProps) => {
  const { loading, error, data } = useQuery<
    SearchUserQuery,
    SearchUserVariables
  >(SEARCH_USER_QUERY, {
    variables: {
      user,
      maxUsers,
      maxRepositories,
    },
  });
  if (loading) return <p>Loading ...</p>;
  if (error) return <p>An error has occurred fetching the data</p>;
  if (data?.search.nodes?.length === 0) {
    return <p>No users found</p>;
  }

  return <SearchResults searchResults={data} />;
};

interface SearchResultData {
  searchResults: SearchUserQuery | undefined;
}

const SearchResults = ({ searchResults }: SearchResultData) => {
  return (
    <StyledSearchResults>
      {searchResults?.search?.nodes
        ?.filter((node) => node?.__typename === "User")
        .map((searchResult) => (
          <Item>
            <StyledImage
              src={(searchResult as User).avatarUrl}
              alt={`${(searchResult as User).login} avatar`}
              width="200px"
              height="200px"
            />
            <h2>
              {(searchResult as User).login && (searchResult as User).login}
            </h2>
            <h3>
              {(searchResult as User).name && (searchResult as User).name}
            </h3>
            <RepositoryList
              repositories={(searchResult as User).repositories?.nodes}
            />
          </Item>
        ))}
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

export const Item = styled.div`
  grid-template-rows: auto;
  flex-direction: column;
  justify-content: center;
  padding: 0.5rem;
`;
export default SearchResultsContainer;
