import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  name: string;
  email: string;
  token: string;
  isLoggedIn: boolean;
}
const initialState: User = {
  id: "",
  name: "",
  email: "",
  token: "",
  isLoggedIn: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{id:string;name:string,email:string;token:string}>) => {
      const { name, email, token, id } = action.payload;
      state.id = id;
      state.name = name;
      state.email = email;
      state.token = token;
      state.isLoggedIn = true;
    },
    logOut: () => ({ ...initialState }),
  },
});

export const { setUser, logOut } = userSlice.actions;
export default userSlice.reducer;
