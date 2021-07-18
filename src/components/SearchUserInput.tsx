import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useReactiveVar } from "@apollo/client";
import { searchInputValue, users } from "../apollo/cache";
import styled from "styled-components";

const handleInputChange = (optionValue: string | undefined) => {
  searchInputValue(optionValue);
};

const SearchUserInput = () => {
  const usersData = useReactiveVar(users);

  const userData = usersData?.map((user) => user?.login) ?? [""];

  return (
    <Autocomplete
      freeSolo
      id="searchUserInput"
      disableClearable
      onChange={(_, optionDetail) => handleInputChange(optionDetail)}
      onInputChange={(_, inputValue) => handleInputChange(inputValue)}
      options={userData}
      renderInput={(params) => (
        <StyledTextField
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

export const StyledTextField = styled(TextField)``;

export default SearchUserInput;
