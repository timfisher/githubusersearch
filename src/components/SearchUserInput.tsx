import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useQuery } from "@apollo/client";
import { GetUsersData, GET_USERS } from "../apollo/queries";
import { searchInputValue } from "../apollo/cache";
import styled from "styled-components";

const handleInputChange = (optionValue: string | undefined) => {
  searchInputValue(optionValue);
};

const SearchUserInput = () => {
  const { data } = useQuery<GetUsersData>(GET_USERS);

  const userData = data?.users.map((user) => user?.login) ?? [""];

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

export const StyledTextField = styled(TextField)`
  min-width: 400px !important;
`;

export default SearchUserInput;
