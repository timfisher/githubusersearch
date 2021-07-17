import { SearchResults, SearchUserInput } from "./components";

import styled from "styled-components";

const MAX_REPOSITORIES = 10;
const MAX_USERS = 50;

function App() {
  return (
    <AppContainer>
      <SearchUserInput />
      <SearchResults maxUsers={MAX_USERS} maxRepositories={MAX_REPOSITORIES} />
    </AppContainer>
  );
}

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  place-items: center stretch;
`;

export default App;
