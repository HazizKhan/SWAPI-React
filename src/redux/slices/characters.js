import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Get } from "../../helpers/http";

const searchTerms = [
  "planets",
  "films",
  "species",
  "vehicles",
  "starships",
  "people",
];

const searchCharacter = createAsyncThunk(
  "searchCharacter",
  async (reqData, thunkAPI) => {
    const response = await Promise.all(searchTerms.map((t) => Get(t, reqData)));
    const json = await Promise.all(response.map((r) => r.json()));
    const results = [];
    json.forEach((data, index) => {
      if (data.results && data.results.length) {
        data.type = searchTerms[index];
        results.push(data);
      }
    });
    return results;
  }
);
const initialState = {
  data: [],
  isPending: false,
  isError: false,
};

const charactersSlice = createSlice({
  name: "characters",
  reducers: {
    getCharacters: (state) => {
      return state.responses;
    },
  },

  initialState,
  extraReducers: {
    [searchCharacter.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.isPending = false;
      state.isError = false;
    },
    [searchCharacter.rejected]: (state, action) => {
      state.data = [];
      state.isPending = false;
      state.isError = true;
    },
    [searchCharacter.pending]: (state, action) => {
      state.data = [];
      state.isPending = true;
      state.isError = false;
    },
  },
});

export default charactersSlice.reducer;
export const { getCharacters } = charactersSlice.actions;

export { searchCharacter };
