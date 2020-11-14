import { combineReducers } from '@reduxjs/toolkit';
import AuthReducer from './AuthReducer';
import StoragesReducer from './StoragesReducer';
import FoodsReducer from './FoodsReducer';

const rootReducer = combineReducers({
  auth: AuthReducer,
  storages: StoragesReducer,
  foods: FoodsReducer,
});

export default rootReducer;
