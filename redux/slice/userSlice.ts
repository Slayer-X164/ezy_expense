import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  name: string;
  email: string;
  token: string;
  isLoggedIn: boolean;
}
const initialState: User = {
  name: "",
  email: "",
  token: "",
  isLoggedIn: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ name: string; email: string; token: string }>
    ) => {
      const { name, email, token } = action.payload;
      state.name = name;
      state.email = email;
      state.token = token;
      state.isLoggedIn = true;
    },
    logOut: (state) => {
      state.name = "";
      state.email = "";
      state.token = "";
      state.isLoggedIn = false;
    },
  },
});

export const {setUser,logOut} = userSlice.actions
export default userSlice.reducer