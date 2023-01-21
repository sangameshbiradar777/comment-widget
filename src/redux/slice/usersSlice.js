import { createSlice } from "@reduxjs/toolkit";
import initialUsers from "../../data/initialUsers";
import { AVATAR_BASE_URL } from "../../config";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    currentUser: {
    name: "Sangamesh",
    id: 1,
    registeredOn: "date",
    avatar: `${AVATAR_BASE_URL}Sangamesh`,
  },
    users: initialUsers,
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
  },
});

export default usersSlice.reducer;
export const { addUser, setCurrentUser } = usersSlice.actions;
