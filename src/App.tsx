import { SearchResults, SearchUserInput } from "./components";

import styled from "styled-components";

const MAX_REPOSITORIES = 25;
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
  padding: 20px;
`;

export default App;
