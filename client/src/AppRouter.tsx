import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Route, Switch, Router, Redirect } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { Box, Container } from '@material-ui/core';
import Home from './views/Home';
import Login from './views/Login';
import Background from './assets/background.svg';

import history from './services/history';

const HOME = '/';
const LOGIN = '/login';

const AppRouter = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root} style={{ backgroundImage: `url(${Background})` }}>
      <Container className={classes.container}>
        <Router history={history}>
          <Switch>
            <Route exact path={HOME} component={Home} />
            <Route path={LOGIN} component={Login} />
            <Redirect to='/' />
          </Switch>
        </Router>
      </Container>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    width: '100%',
  },
  container: {
    maxWidth: 600,
    padding: 0,
    height: '100%',
  },
}));

export default hot(AppRouter);
