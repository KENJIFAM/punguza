import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

import { darken, makeStyles } from '@material-ui/core/styles';
import { Box, Container, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/AddRounded';
import Stack from '../components/Stack';
import Header from '../components/Header';
import FoodList from '../components/FoodList';
import StorageTabs from '../components/StorageTabs';
import NotificationDialog from '../components/NotificationDialog';
import Spinner from '../components/Spinner';
import AddFoodDialog from '../components/AddFoodDialog';
import { ReduxState } from '../redux';

const Home = () => {
  const classes = useStyles();
  const history = useHistory();

  const userData = useSelector((state: ReduxState) => state.auth.data);
  const storages = useSelector((state: ReduxState) => state.storages.data);
  const foods = useSelector((state: ReduxState) => state.foods.data);

  const [searchInput, setSearchInput] = useState('');
  const [tab, setTab] = useState('ALL');
  const [notificationDialogOpen, setNotificationDialogOpen] = useState(false);
  const [addFoodDialogOpen, setAddFooDialogOpen] = useState(false);

  const sortedFoods = useMemo(
    () =>
      [...foods.usableFoods].sort((a, b) =>
        moment(a.expiredDate).isBefore(moment(b.expiredDate)) ? -1 : 1,
      ),
    [foods.usableFoods],
  );

  const foodsToRender = useMemo(() => {
    if (searchInput) {
      return sortedFoods.filter((f) =>
        [f.name, f.brand ?? '', f.icon]
          .map((w) => w.toLowerCase())
          .some((w) => w.includes(searchInput.toLowerCase())),
      );
    }
    return tab === 'ALL' ? sortedFoods : sortedFoods.filter((f) => f.storage.id === tab);
  }, [sortedFoods, tab, searchInput]);

  useEffect(() => {
    if (!userData) {
      history.push('/login');
    }
  }, [userData, history]);

  if (!userData || !storages.length) {
    return (
      <Container className={classes.loadingContainer}>
        <Spinner multi />
      </Container>
    );
  }

  return (
    <Container className={classes.root}>
      <Header
        searchInput={searchInput}
        onSearchInputChange={setSearchInput}
        setDialogOpen={setNotificationDialogOpen}
      />
      <Stack
        expiredItems={foods.expiredFoods.length}
        empty={!sortedFoods.length}
        onClick={() => setNotificationDialogOpen(true)}
      />
      <Box className={classes.main}>
        <StorageTabs value={tab} onChange={setTab} />
        <FoodList foodsToRender={foodsToRender} />
      </Box>
      <NotificationDialog
        open={notificationDialogOpen}
        onClose={() => setNotificationDialogOpen(false)}
      />
      {addFoodDialogOpen && (
        <AddFoodDialog open={addFoodDialogOpen} onClose={() => setAddFooDialogOpen(false)} />
      )}
      <IconButton className={classes.addButton} onClick={() => setAddFooDialogOpen(true)}>
        <AddIcon className={classes.addIcon} />
      </IconButton>
    </Container>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
    height: '100%',
    position: 'relative',
    overflow: 'hidden',
  },
  main: {
    backgroundColor: '#fafafa',
    height: '100%',
    marginTop: 53,
    borderRadius: 13,
    [theme.breakpoints.down('xs')]: {
      borderRadius: 0,
    },
  },
  addButton: {
    width: 60,
    height: 60,
    boxShadow: '0 2px 16px 0 rgba(0, 0, 0, 0.5)',
    backgroundColor: theme.palette.primary.main,
    position: 'absolute',
    bottom: 50,
    right: theme.spacing(2),
    '&:hover': {
      backgroundColor: darken(theme.palette.primary.main, 0.1),
    },
  },
  addIcon: {
    color: theme.palette.common.white,
    width: 50,
    height: 50,
  },
  loadingContainer: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.secondary.light,
  },
}));

export default Home;
