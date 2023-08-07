import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type initialState = {
  token: string;
};

const savedToken: string = !!localStorage.getItem("token")
  ? JSON.parse(String(localStorage.getItem("token")))
  : "";

const initialState: initialState = {
  token: savedToken,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      localStorage.setItem("token", JSON.stringify(action.payload));
    },
    removeToken: (state) => {
      state.token = "";
      localStorage.removeItem("token");
    },
  },
});

export const { addToken, removeToken } = authSlice.actions;
export default authSlice.reducer;
