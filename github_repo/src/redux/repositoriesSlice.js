// src/redux/repositoriesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  repos: [],
  loading: true,
  showMore: {},
  deleteIndex: null,
  snackbarOpen: false, // Add snackbarOpen state
};

const repositoriesSlice = createSlice({
  name: 'repositories',
  initialState,
  reducers: {
    setRepos(state, action) {
      state.repos = action.payload;
      state.loading = false;
    },
    toggleShowMore(state, action) {
      const { index } = action.payload;
      state.showMore[index] = !state.showMore[index];
    },
    setDeleteIndex(state, action) {
      state.deleteIndex = action.payload;
    },
    deleteRepo(state) {
      state.repos.splice(state.deleteIndex, 1);
      state.deleteIndex = null;
    },
    openSnackbar(state) { // Action to open Snackbar
      state.snackbarOpen = true;
    },
    closeSnackbar(state) { // Action to close Snackbar
      state.snackbarOpen = false;
    },
  },
});

export const { setRepos, toggleShowMore, setDeleteIndex, deleteRepo, openSnackbar, closeSnackbar } = repositoriesSlice.actions;
export default repositoriesSlice.reducer;
