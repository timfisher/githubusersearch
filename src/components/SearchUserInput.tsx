import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useReactiveVar } from "@apollo/client";
import { searchInputValue, users } from "../apollo/cache";

const handleInputChange = (optionValue: string | undefined) => {
  searchInputValue(optionValue);
};

/**
 * Search User Input
 *
 * Uses the user data returned as a reactive var to provide autosuggestions for usernames
 * similar to the current input
 */
const SearchUserInput = () => {
  const userData = useReactiveVar(users);

  // Map out usernames to use for autosuggestions
  const autoSuggestUserData = userData?.map((user) => user?.login) ?? [""];

  return (
    <Autocomplete
      freeSolo
      id="searchUserInput"
      disableClearable
      onChange={(_, optionDetail) => handleInputChange(optionDetail)}
      onInputChange={(_, inputValue) => handleInputChange(inputValue)}
      options={autoSuggestUserData}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search for user"
          margin="normal"
          variant="outlined"
          InputProps={{ ...params.InputProps, type: "search" }}
        />
      )}
    />
  );
};

export default SearchUserInput;
