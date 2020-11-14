import moment from 'moment';
import { createReducer } from '@reduxjs/toolkit';
import { Food } from '../../services/types';
import { categorizeFoods } from '../../services/utils';
import * as FoodsActions from '../actions/FoodsActions';

export interface FoodsState {
  data: {
    usableFoods: Food[];
    expiredFoods: Food[];
    historyFoods: Food[];
  };
  loading: boolean;
  error: string | null;
}

const INITIAL_STATE: FoodsState = {
  data: {
    usableFoods: [],
    expiredFoods: [],
    historyFoods: [],
  },
  loading: false,
  error: null,
};

const FoodsReducer = createReducer(INITIAL_STATE, (builder) => {
  builder.addCase(FoodsActions.updateFoods, (state, action) => {
    const [usableFoods, expiredFoods, historyFoods] = categorizeFoods(action.payload);
    state.data = { usableFoods, expiredFoods, historyFoods };
  });

  builder.addCase(FoodsActions.clearErrorFoods, (state, action) => {
    state.error = null;
  });

  // Fetch Foods
  builder.addCase(FoodsActions.fetchFoods.pending, (state, action) => {
    state.loading = true;
  });
  builder.addCase(FoodsActions.fetchFoods.fulfilled, (state, action) => {
    const [usableFoods, expiredFoods, historyFoods] = categorizeFoods(action.payload);
    state.data = { usableFoods, expiredFoods, historyFoods };
    state.loading = false;
  });
  builder.addCase(FoodsActions.fetchFoods.rejected, (state, action) => {
    state.error = action.error.message ?? '';
    state.loading = false;
  });

  // Add Food
  builder.addCase(FoodsActions.addFood.pending, (state, action) => {
    state.error = null;
    state.loading = true;
  });
  builder.addCase(FoodsActions.addFood.fulfilled, (state, action) => {
    if (moment().isBefore(moment(action.payload.expiredDate))) {
      state.data.usableFoods.push(action.payload);
    } else {
      state.data.expiredFoods.push(action.payload);
    }
    state.loading = false;
  });
  builder.addCase(FoodsActions.addFood.rejected, (state, action) => {
    state.error = action.error.message ?? '';
    state.loading = false;
  });

  // Update Food
  builder.addCase(FoodsActions.updateFood.pending, (state, action) => {
    state.error = null;
    state.loading = true;
  });
  builder.addCase(FoodsActions.updateFood.fulfilled, (state, action) => {
    const foods = Object.values(state.data).flatMap((fs) =>
      fs.map((food) => (food.id === action.payload.id ? action.payload : food)),
    );
    const [usableFoods, expiredFoods, historyFoods] = categorizeFoods(foods);
    state.data = { usableFoods, expiredFoods, historyFoods };
    state.loading = false;
  });
  builder.addCase(FoodsActions.updateFood.rejected, (state, action) => {
    state.error = action.error.message ?? '';
    state.loading = false;
  });

  // Delete Food
  builder.addCase(FoodsActions.deleteFood.pending, (state, action) => {
    state.error = null;
    state.loading = true;
  });
  builder.addCase(FoodsActions.deleteFood.fulfilled, (state, action) => {
    state.data.historyFoods = state.data.historyFoods.filter((food) => food.id !== action.payload);
    state.data.expiredFoods = state.data.expiredFoods.filter((food) => food.id !== action.payload);
    state.data.usableFoods = state.data.historyFoods.filter((food) => food.id !== action.payload);
    state.loading = false;
  });
  builder.addCase(FoodsActions.deleteFood.rejected, (state, action) => {
    state.error = action.error.message ?? '';
    state.loading = false;
  });
});

export default FoodsReducer;
