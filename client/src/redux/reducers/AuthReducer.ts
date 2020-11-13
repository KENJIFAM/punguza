import { createReducer } from '@reduxjs/toolkit';
import { User } from '../../services/types';
import * as AuthActions from '../actions/AuthActions';

export interface AuthState {
  data: User | null;
  loading: boolean;
  initialLoading: boolean;
  error: string | null;
}

const INITIAL_STATE: AuthState = {
  data: null,
  loading: false,
  initialLoading: true,
  error: null,
};

const AuthReducer = createReducer(INITIAL_STATE, (builder) => {
  builder.addCase(AuthActions.authReset, (state, action) => {
    state.data = null;
    state.error = null;
    state.loading = false;
  });

  builder.addCase(AuthActions.updateUser, (state, action) => {
    state.data = action.payload;
  });

  // User login
  builder.addCase(AuthActions.userLogin.pending, (state, action) => {
    state.loading = true;
  });
  builder.addCase(AuthActions.userLogin.fulfilled, (state, action) => {
    state.data = action.payload;
    state.loading = false;
  });
  builder.addCase(AuthActions.userLogin.rejected, (state, action) => {
    state.error = action.error.message ?? '';
    state.loading = false;
  });

  // User signup
  builder.addCase(AuthActions.userSignUp.pending, (state, action) => {
    state.loading = true;
  });
  builder.addCase(AuthActions.userSignUp.fulfilled, (state, action) => {
    state.data = action.payload;
    state.loading = false;
  });
  builder.addCase(AuthActions.userSignUp.rejected, (state, action) => {
    state.error = action.error.message ?? '';
    state.loading = false;
  });

  // Initial auth
  builder.addCase(AuthActions.initialAuth.pending, (state, action) => {
    state.initialLoading = true;
  });
  builder.addCase(AuthActions.initialAuth.fulfilled, (state, action) => {
    state.data = action.payload;
    state.initialLoading = false;
  });
  builder.addCase(AuthActions.initialAuth.rejected, (state, action) => {
    state.error = action.error.message ?? '';
    state.initialLoading = false;
  });
});

export default AuthReducer;
