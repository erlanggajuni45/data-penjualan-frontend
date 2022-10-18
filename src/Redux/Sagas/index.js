import { all } from 'redux-saga/effects';
import productSagas from './productSagas';
import trxSagas from './trxSagas';

function* rootSagas() {
  yield all([...productSagas, ...trxSagas]);
}

export default rootSagas;
