import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import axios from '../../services/api';
import { ReduxState } from '..';
import { Storage } from '../../services/types';

export const updateStorages = createAction<Storage[]>('Storages/UPDATE_STORAGES');

export const fetchStorages = createAsyncThunk<Storage[], void, { state: ReduxState }>(
  'Storages/FETCH_STORAGES',
  async () => {
    try {
      const response: AxiosResponse<Storage[]> = await axios.get(`/storages`);
      return response.data;
    } catch (e) {
      throw new Error('Fetch storages failed!');
    }
  },
);
