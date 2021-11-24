import { combineReducers } from "redux";
import charactersSlice from "../slices/characters";

const reducer = combineReducers({
  characters: charactersSlice,
});

export default reducer;
