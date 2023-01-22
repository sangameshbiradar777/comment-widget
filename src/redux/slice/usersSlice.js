import { createSlice } from "@reduxjs/toolkit";
import initialUsers from "../../data/initialUsers";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    currentUser: localStorage.getItem("currentUser") && localStorage.getItem('currentUser') !== 'undefined'
      ? JSON.parse(localStorage.getItem("currentUser"))
      : null,
    users: localStorage.getItem("users")
      ? JSON.parse(localStorage.getItem("users"))
      : initialUsers,
  },
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    setCurrentUser: (state, action) => {
      state.currentUser = state.users.find(
        (user) => user.name === action.payload
      );
    },
    removeCurrentUser: (state) => {
      state.currentUser = null;
    }
  },
});

export default usersSlice.reducer;
export const { addUser, setCurrentUser, removeCurrentUser } = usersSlice.actions;
