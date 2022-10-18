import { combineReducers } from 'redux';
import { productReducer } from './productReducer';
import { trxReducer } from './trxReducer';

export const rootReducer = combineReducers({
  product: productReducer,
  trx: trxReducer,
});
