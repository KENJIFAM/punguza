import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hot } from 'react-hot-loader/root';
import { Route, Switch, Router, Redirect } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { Box, Container } from '@material-ui/core';
import Home from './views/Home';
import Login from './views/Login';
import Signup from './views/Signup';
import Background from './assets/background.svg';
import Spinner from './components/Spinner';

import history from './services/history';
import { initialAuth } from './redux/actions/AuthActions';
import { ReduxState } from './redux';

const HOME = '/';
const LOGIN = '/login';
const SIGNUP = '/signup';

const AppRouter = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const authLoading = useSelector((state: ReduxState) => state.auth.initialLoading);

  useEffect(() => {
    dispatch(initialAuth());
  }, [dispatch]);

  if (authLoading) {
    return (
      <Container
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundImage: `url(${Background})`,
        }}
      >
        <Spinner multi />
      </Container>
    );
  }

  return (
    <Box className={classes.root} style={{ backgroundImage: `url(${Background})` }}>
      <Container className={classes.container}>
        <Router history={history}>
          <Switch>
            <Route exact path={HOME} component={Home} />
            <Route path={LOGIN} component={Login} />
            <Route path={SIGNUP} component={Signup} />
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
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  container: {
    maxWidth: 600,
    padding: 0,
    height: '100%',
  },
}));

export default hot(AppRouter);
