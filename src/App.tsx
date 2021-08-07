import { SearchResults, SearchUserInput } from "./components";

import styled from "styled-components";

// TODO change this number and paginate if we require more user results
const MAX_USERS = 10;

/**
 * App containing a search input and search results for github users
 */
function App() {
  return (
    <AppContainer>
      <SearchUserInput />
      <SearchResults maxUsers={MAX_USERS} />
    </AppContainer>
  );
}

const AppContainer = styled.div`
  padding: 20px;
`;

export default App;
