// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import repositoriesReducer from './repositoriesSlice';

export default configureStore({
  reducer: {
    repositories: repositoriesReducer,
  },
});
