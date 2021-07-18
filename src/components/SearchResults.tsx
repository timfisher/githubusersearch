import { User } from "../generated/graphql";

import {
  SEARCH_USER_QUERY,
  SearchUserQuery,
  SearchUserVariables,
} from "../apollo/queries";

import { useQuery, useReactiveVar } from "@apollo/client";

import { searchInputValue, users } from "../apollo/cache";
import { LoadingAnimation, SearchResult } from ".";
import { Grid } from "@material-ui/core";
import { useEffect } from "react";

const SearchResultsContainer = ({
  maxUsers,
  maxRepositories,
}: Pick<SearchUserVariables, "maxUsers" | "maxRepositories">) => {
  const user = useReactiveVar(searchInputValue);
  const {
    loading,
    error,
    data: searchResults,
  } = useQuery<SearchUserQuery, SearchUserVariables>(SEARCH_USER_QUERY, {
    variables: {
      user,
      maxUsers,
      maxRepositories,
    },
  });
  const usersData = searchResults?.search?.nodes?.filter(
    (node) => node?.__typename === "User"
  ) as User[];
  useEffect(() => {
    users(usersData);
  }, [usersData]);

  if (loading) return <LoadingAnimation />;
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
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="flex-start"
      spacing={2}
    >
      {users.map(
        ({ avatarUrl, login, name, repositories: { nodes: repositories } }) => (
          <SearchResult
            key={login}
            avatarUrl={avatarUrl}
            login={login}
            name={name}
            repositories={repositories}
          />
        )
      )}
    </Grid>
  );
};

export default SearchResultsContainer;
