import SearchResultsContainer from "./components/SearchResults";
import { useState } from "react";
import styled from "styled-components";

const MAX_REPOSITORIES = 10;
const MAX_USERS = 50;

const onChange =
  (setUsername: React.Dispatch<React.SetStateAction<string>>) =>
  (e: React.FormEvent<HTMLInputElement>) => {
    setUsername(e.currentTarget.value);
  };

function App() {
  const [username, setUsername] = useState<string>("");
  return (
    <AppContainer>
      <label htmlFor="username">Search username:</label>
      <input
        type="text"
        id="username"
        name="username"
        onChange={onChange(setUsername)}
      />
      <SearchResultsContainer
        user={username}
        maxUsers={MAX_USERS}
        maxRepositories={MAX_REPOSITORIES}
      />
    </AppContainer>
  );
}

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  place-items: center stretch;
`;

export default App;
