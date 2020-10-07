import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { setConfig } from 'react-hot-loader';

import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import App from './App';

import theme from './assets/styles/theme';
import store from './redux';
import * as serviceWorker from './serviceWorker';

setConfig({
  reloadHooks: false,
});

const AppWithStyles = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>
);

const render = () =>
  ReactDOM.render(
    <Provider store={store}>
      <AppWithStyles />
    </Provider>,
    document.getElementById('root'),
  );

render();

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./App', render);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
