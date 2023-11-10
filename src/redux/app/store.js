import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "../features/shoppingSlice";
export const store = configureStore({
  reducer: {
    globalState: globalReducer,
  },
});
