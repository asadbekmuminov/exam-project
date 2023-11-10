import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  AuthIsReady: false,
  amount: 0,
  subtotal: 0,
  addData: localStorage.getItem("addData")
    ? JSON.parse(localStorage.getItem("addData"))
    : [],
  user: localStorage.getItem("user") ? localStorage.getItem("user") : null,
};

const globalSlice = createSlice({
  name: "confy-store",
  initialState,
  reducers: {
    login: (state, { payload }) => {
      state.user = payload;
      JSON.stringify(localStorage.s);
    },
    logout: (state) => {
      state.user = null;
    },
    authIsReady: (state) => {
      state.AuthIsReady = true;
    },
    incrementAmount: (state) => {
      state.amount++;
    },
    decrementAmount: (state) => {
      state.amount--;
    },
    addDataLocalStorage: (state, { payload }) => {
      const isNewProduct = state.addData.every((product) => {
        return product.id !== payload.id;
      });

      if (isNewProduct) {
        state.addData = [...state.addData, payload];
        localStorage.setItem("addData", JSON.stringify(state.addData));
      }
    },

    removeCart: (state, { payload }) => {
      const indexToRemove = state.addData.findIndex(
        (product) => product.id === payload.id
      );

      if (indexToRemove !== -1) {
        state.addData.splice(indexToRemove, 1);
        localStorage.setItem("addData", JSON.stringify(state.addData));
      }
    },
  },
});

export const {
  login,
  removeCart,
  addDataLocalStorage,
  logout,
  authIsReady,
  incrementAmount,
  decrementAmount,
  addAmount,
} = globalSlice.actions;

export default globalSlice.reducer;
