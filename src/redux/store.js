import { configureStore } from "@reduxjs/toolkit";
import usersReducer from './slice/usersSlice';
import commentsReducer from './slice/commentsSlice';

const store = configureStore({
  reducer: {
    users: usersReducer,
    comments: commentsReducer
  }
})

export default store;