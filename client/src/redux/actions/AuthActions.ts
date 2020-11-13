import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import axios, { setTokenHeader, saveToken, getToken, removeToken } from '../../services/api';
import { ReduxState } from '..';
import { LoginFormData, SignUpFormData, User } from '../../services/types';
import history from '../../services/history';
import { fetchStorages, updateStorages } from './StoragesActions';
import { fetchFoods, updateFoods } from './FoodsActions';

export const authReset = createAction('Auth/AUTH_RESET');

export const updateUser = createAction<User>('Auth/UPDATE_USER');

export const userLogout = createAsyncThunk<void, void, { state: ReduxState }>(
  'Auth/USER_LOGOUT',
  async (_, { dispatch }) => {
    removeToken();
    setTokenHeader();
    dispatch(authReset());
    dispatch(updateStorages([]));
    dispatch(updateFoods([]));
    history.push('/login');
  },
);

export const userLogin = createAsyncThunk<User, LoginFormData, { state: ReduxState }>(
  'Auth/USER_LOGIN',
  async (loginFormData: LoginFormData, { dispatch }) => {
    try {
      const auth: AxiosResponse<{ user: User; token: string }> = await axios.post(
        `/auth/login`,
        loginFormData,
      );
      const { token, user } = auth.data;
      setTokenHeader(token);
      saveToken(token);
      dispatch(fetchStorages());
      dispatch(fetchFoods());
      history.push('/');
      return user;
    } catch (e) {
      throw new Error('Wrong email or password!');
    }
  },
);

export const userSignUp = createAsyncThunk<User, SignUpFormData, { state: ReduxState }>(
  'Auth/USER_SIGNUP',
  async (signupFormData: SignUpFormData, { dispatch }) => {
    try {
      const auth: AxiosResponse<{ user: User; token: string }> = await axios.post(
        `/auth/signup`,
        signupFormData,
      );
      const { token, user } = auth.data;
      setTokenHeader(token);
      saveToken(token);
      dispatch(fetchStorages());
      dispatch(fetchFoods());
      history.push('/');
      return user;
    } catch (e) {
      throw new Error('Register failed!');
    }
  },
);

export const initialAuth = createAsyncThunk<User | null, void, { state: ReduxState }>(
  'Auth/INIT_AUTH',
  async (_, { getState, dispatch }) => {
    const token = getToken();
    const encodedTokenPayload = token?.split('.')[1];
    const decodedTokenPayload = encodedTokenPayload ? JSON.parse(atob(encodedTokenPayload)) : null;
    const now = Date.now() / 1000;
    const tokenValid =
      !!decodedTokenPayload?.id &&
      parseInt(decodedTokenPayload.iat) < now &&
      parseInt(decodedTokenPayload.exp) > now;
    if (token && tokenValid) {
      const { data } = getState().auth;
      if (data) {
        return data;
      }
      setTokenHeader(token);
      const response: AxiosResponse<User> = await axios.get('/user');
      dispatch(fetchStorages());
      dispatch(fetchFoods());
      return response.data;
    } else {
      return null;
    }
  },
);
