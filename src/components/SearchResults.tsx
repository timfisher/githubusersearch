import { User } from "../generated/graphql";

import {
  SearchUserQuery,
  SearchUserVariables,
  GET_SEARCH_INPUT_VALUE,
  SEARCH_USER_QUERY,
  GetSearchInputValueData,
} from "../apollo/queries";

import { useQuery } from "@apollo/client";

import { users } from "../apollo/cache";
import { LoadingAnimation, SearchResult } from ".";
import { Grid } from "@material-ui/core";

const SearchResultsContainer = ({
  maxUsers,
  maxRepositories,
}: Pick<SearchUserVariables, "maxUsers" | "maxRepositories">) => {
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
