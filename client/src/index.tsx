import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { setConfig } from 'react-hot-loader';

import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import AppRouter from './AppRouter';

import theme from './assets/styles/theme';
import store from './redux';
import * as serviceWorker from './serviceWorker';

setConfig({
  reloadHooks: false,
});

const AppWithStyles = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <AppRouter />
  </ThemeProvider>
);

ReactDOM.render(
  <Provider store={store}>
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <AppWithStyles />
    </MuiPickersUtilsProvider>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
