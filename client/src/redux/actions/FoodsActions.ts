import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import axios from '../../services/api';
import { ReduxState } from '..';
import { Food, FoodFormData } from '../../services/types';

export const updateFoods = createAction<Food[]>('Foods/UPDATE_FOODS');

export const clearErrorFoods = createAction('Foods/CLEAR_ERROR');

export const fetchFoods = createAsyncThunk<Food[], void, { state: ReduxState }>(
  'Foods/FETCH_FOODS',
  async () => {
    try {
      const response: AxiosResponse<Food[]> = await axios.get(`/foods`);
      return response.data;
    } catch (e) {
      throw new Error('Fetch foods failed!');
    }
  },
);

export const addFood = createAsyncThunk<Food, FoodFormData, { state: ReduxState }>(
  'Foods/ADD_FOOD',
  async (foodFormData) => {
    try {
      const response: AxiosResponse<Food> = await axios.post(`/foods`, foodFormData);
      return response.data;
    } catch (e) {
      throw new Error('Add food failed!');
    }
  },
);

export const updateFood = createAsyncThunk<
  Food,
  { foodId: string; data: Partial<FoodFormData> },
  { state: ReduxState }
>('Foods/UPDATE_FOOD', async ({ foodId, data }) => {
  try {
    const response: AxiosResponse<Food> = await axios.patch(`/foods/${foodId}`, data);
    return response.data;
  } catch (e) {
    throw new Error('Update food failed!');
  }
});

export const deleteFood = createAsyncThunk<string, string, { state: ReduxState }>(
  'Foods/DELETE_FOOD',
  async (foodId) => {
    try {
      const response: AxiosResponse<{ id: string }> = await axios.delete(`/foods/${foodId}`);
      return response.data.id;
    } catch (e) {
      throw new Error('Delete food failed!');
    }
  },
);
