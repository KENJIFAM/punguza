import React, { useMemo, useState } from 'react';

import { darken, makeStyles } from '@material-ui/core/styles';
import { Box, Container, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/AddRounded';
import Stack from '../components/Stack';
import Header from '../components/Header';
import FoodList from '../components/FoodList';
import StorageTabs from '../components/StorageTabs';
import NotificationDialog from '../components/NotificationDialog';
import { categories } from '../services/data';

const Home = () => {
  const classes = useStyles();

  const [searchInput, setSearchInput] = useState('');
  const [tab, setTab] = useState('ALL');
  const [dialogOpen, setDialogOpen] = useState(false);

  const foodToRender = useMemo(() => {
    if (tab === 'ALL') {
      return categories
        .flatMap((c) => c.food.map((f) => ({ ...f, categoryName: c.name })))
        .sort((a, b) => (a.exp < b.exp ? 1 : -1));
    }
    const cat = categories.find((c) => c.id === tab);
    return (
      cat?.food
        .map((f) => ({ ...f, categoryName: cat.name }))
        .sort((a, b) => (a.exp < b.exp ? 1 : -1)) ?? []
    );
  }, [tab]);

  return (
    <Container className={classes.root}>
      <Header
        searchInput={searchInput}
        onSearchInputChange={setSearchInput}
        setDialogOpen={setDialogOpen}
      />
      <Stack />
      <Box className={classes.main}>
        <StorageTabs value={tab} onChange={setTab} />
        <FoodList foodToRender={foodToRender} />
      </Box>
      <NotificationDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
      <IconButton className={classes.addButton}>
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
}));

export default Home;
