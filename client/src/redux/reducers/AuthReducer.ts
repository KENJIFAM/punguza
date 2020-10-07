import { createReducer } from '@reduxjs/toolkit';
import * as AuthActions from '../actions/AuthActions';

export interface AuthState {
  data: /* User | */ null;
  loading: boolean;
  error: string | null;
}

const INITIAL_STATE: AuthState = {
  data: null,
  loading: false,
  error: null,
};

const AuthReducer = createReducer(INITIAL_STATE, (builder) => {
  builder.addCase(AuthActions.userLogout, (state, action) => ({
    ...state,
    data: null,
    loading: false,
    error: null,
  }));
});

export default AuthReducer;
