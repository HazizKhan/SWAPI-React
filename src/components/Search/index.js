import {
  OutlinedInput,
  FormControl,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { searchCharacter } from "../../redux/slices/characters";
import { useDispatch } from "react-redux";
import { useCallback, useEffect, useState } from "react";

const Search = () => {
  const [inputValue, setInputValue] = useState();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };
  const cb = useCallback(() => {
    if (inputValue) {
      dispatch(
        searchCharacter({
          params: { search: inputValue },
        })
      );
    }
  }, [inputValue, dispatch]);
  useEffect(() => {
    let timeout = setTimeout(() => {
      cb();
    }, 300);
    return () => {
      clearTimeout(timeout);
    };
  }, [inputValue, cb]);
  return (
    <FormControl fullWidth sx={{ m: 1 }}>
      <InputLabel htmlFor="outlined-adornment-amount">Search Character</InputLabel>
      <OutlinedInput
        id="outlined-adornment-amount"
        onChange={handleChange}
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
        label="Search Characters"
      />
    </FormControl>
  );
};

export default Search;
