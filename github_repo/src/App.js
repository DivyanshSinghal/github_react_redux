// src/App.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Container, Grid } from '@material-ui/core';
import RepositoryCard from './components/RepositoryCard';
import DeleteConfirmationDialog from './components/DeleteConfirmationDialog';
import CircularProgressIndicator from './components/CircularProgressIndicator';
import NotificationSnackbar from './components/NotificationSnackbar';
import { setRepos, toggleShowMore, setDeleteIndex, deleteRepo, openSnackbar, closeSnackbar } from './redux/repositoriesSlice';

const App = () => {
  const dispatch = useDispatch();
  const { repos, loading, showMore, deleteIndex, snackbarOpen } = useSelector((state) => state.repositories);

  useEffect(() => {
    axios.get('https://api.github.com/users/visionmedia/repos')
      .then(response => {
        dispatch(setRepos(response.data.slice(0, 12)));
      })
      .catch(error => console.error(error));
  }, [dispatch]);

  const handleShowMore = (index) => {
    dispatch(toggleShowMore({ index }));
  };

  const handleDeleteClick = (index) => {
    dispatch(setDeleteIndex(index));
  };

  const handleDeleteConfirm = () => {
    dispatch(deleteRepo());
    dispatch(closeSnackbar());
    dispatch(openSnackbar()); // Open Snackbar after deletion
  };

  const handleDeleteCancel = () => {
    dispatch(setDeleteIndex(null));
  };

  const handleSnackbarClose = () => {
    dispatch(closeSnackbar());
  };

  return (
    <div>
      {loading ? (
        <CircularProgressIndicator />
      ) : (
        <Container>
          <Grid container spacing={3}>
            {repos.map((repo, index) => (
              <RepositoryCard
                key={index}
                repo={repo}
                onDeleteClick={() => handleDeleteClick(index)}
                onShowMoreClick={() => handleShowMore(index)}
                showMore={showMore[index]}
              />
            ))}
          </Grid>
        </Container>
      )}
      <DeleteConfirmationDialog
        open={deleteIndex !== null}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
      />
      <NotificationSnackbar
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        message="Repo deleted successfully"
        severity="success"
      />
    </div>
  );
};

export default App;
