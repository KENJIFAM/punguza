import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import rootReducer from './reducers';

const store = configureStore({ reducer: rootReducer });

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./reducers', () => store.replaceReducer(rootReducer));
}

export type ReduxState = ReturnType<typeof store.getState>;
export type ReduxDispatch = typeof store.dispatch;
export type ReduxThunk<T = void> = ThunkAction<T, ReduxState, unknown, Action<string>>;

export default store;
