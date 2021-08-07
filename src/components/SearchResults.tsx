import { SearchUserQueryVariables, User, useSearchUserQuery } from "../generated/graphql";

import { useReactiveVar } from "@apollo/client";

import { searchInputValue, users } from "../apollo/cache";
import { LoadingAnimation, SearchResult } from ".";
import { Grid } from "@material-ui/core";
import { useEffect } from "react";

/**
 * Container to return a list of Search Results @link SearchResult. Performs the query to fetch the user data.
 * Uses the user reactive var user to populate the username from the search input.
 *
 * @param maxUsers - Max users.
 * @param maxRepositories - Max repositories.
 */
const SearchResultsContainer = ({
  maxUsers,
}: Pick<SearchUserQueryVariables, "maxUsers">) => {
  const user = useReactiveVar(searchInputValue);
  const {
    loading,
    error,
    data: searchResults,
  } = useSearchUserQuery({
    variables: {
      user,
      maxUsers,
    },
  });
  // Filter only Users
  const usersData = searchResults?.search?.nodes?.filter(
    (node) => node?.__typename === "User"
  ) as User[];

  // Only set usersData if it changes and not due to rerenders
  useEffect(() => {
    users(usersData);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usersData]);

  // Return a loading animation if the query is executing
  if (loading) return <LoadingAnimation />;

  // Return an error message if the query fails
  if (error) return <p>An error has occurred fetching the data</p>;

  // Return no users message if none exist
  if (searchResults?.search.nodes?.length === 0) {
    return <p>No users found</p>;
  } 

  return <SearchResults users={usersData} />;
};

interface SearchResultData {
  users: User[];
}

/**
 * Render a list of Search Results @link Search Result.
 *
 * Uses a Mui Grid for responsiveness, 3 users on tablet and above breakpoints and 1 on mobile.
 * See the individual Grid items for breakpoint settings.
 *
 * @param users - User results array.
 */
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
        ({ avatarUrl, login, name }: User) => (
          <SearchResult
            key={login}
            avatarUrl={avatarUrl}
            login={login}
            name={name}
          />
        )
      )}
    </Grid>
  );
};

export default SearchResultsContainer;
