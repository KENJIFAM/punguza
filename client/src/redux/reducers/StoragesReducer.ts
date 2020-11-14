import { createReducer } from '@reduxjs/toolkit';
import { Storage } from '../../services/types';
import * as StoragesActions from '../actions/StoragesActions';

export interface StoragesState {
  data: Storage[];
  loading: boolean;
  error: string | null;
}

const INITIAL_STATE: StoragesState = {
  data: [],
  loading: false,
  error: null,
};

const StoragesReducer = createReducer(INITIAL_STATE, (builder) => {
  builder.addCase(StoragesActions.updateStorages, (state, action) => {
    state.data = action.payload;
  });

  // Fetch storages
  builder.addCase(StoragesActions.fetchStorages.pending, (state, action) => {
    state.loading = true;
  });
  builder.addCase(StoragesActions.fetchStorages.fulfilled, (state, action) => {
    state.data = action.payload;
    state.loading = false;
  });
  builder.addCase(StoragesActions.fetchStorages.rejected, (state, action) => {
    state.error = action.error.message ?? '';
    state.loading = false;
  });
});

export default StoragesReducer;
