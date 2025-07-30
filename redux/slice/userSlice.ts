import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  _id: string;
  name?: string;
  email?: string;
  createdAt: string;
  password: string;
  updatedAt: string;
}

interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logOut: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, logOut } = userSlice.actions;
export default userSlice.reducer;
