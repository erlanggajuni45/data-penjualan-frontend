import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import {
  GET_TRX,
  ADD_TRX,
  DELETE_TRX,
  EDIT_TRX,
  UPDATE_TRX,
} from '../Constants/trxConstants';
import {
  getTrxApi,
  addTrxApi,
  deleteTrxApi,
  editTrxApi,
  updateTrxApi,
} from '../Apis/trxApis';
import {
  getTrxSuccess,
  getTrxFailed,
  addTrxSuccess,
  addTrxFailed,
  deleteTrxSuccess,
  deleteTrxFailed,
  editTrxSuccess,
  editTrxFailed,
  updateTrxSuccess,
  updateTrxFailed,
} from '../Actions/trxActions';

function* getTrxSaga() {
  try {
    const response = yield call(getTrxApi);
    if (response) {
      switch (response.status) {
        case 200:
          yield put(getTrxSuccess(response.data));
          break;
        default:
          yield put(getTrxFailed(response.data));
      }
    }
  } catch (error) {
    if (error.response) {
      switch (error.response.status) {
        case 500:
          yield put(getTrxFailed(error.response));
          break;
        default:
      }
    }
  }
}

function* addTrxSaga(params) {
  try {
    const response = yield call(addTrxApi, { ...params.payload });
    if (response) {
      switch (response.status) {
        case 201:
          yield put(addTrxSuccess(response.data));
          break;
        default:
          yield put(addTrxFailed(response.data));
      }
    }
  } catch (error) {
    if (error.response) {
      switch (error.response.status) {
        case 403:
          yield put(addTrxFailed(error.response));
          break;
        case 404:
          yield put(addTrxFailed(error.response));
          break;
        case 500:
          yield put(addTrxFailed(error.response));
          break;
        default:
      }
    }
  }
}

function* deleteTrxSaga(params) {
  try {
    const response = yield call(deleteTrxApi, params.payload);
    if (response) {
      switch (response.status) {
        case 204:
          yield put(deleteTrxSuccess(response.data));
          break;
        case 422:
          yield put(deleteTrxFailed(response.data));
          break;
        default:
      }
    }
  } catch (error) {
    switch (error.response.status) {
      case 404:
        yield put(deleteTrxFailed(error.response));
        break;
      case 500:
        yield put(deleteTrxFailed(error.response));
        break;
      default:
    }
  }
}

function* editTrxSaga(params) {
  try {
    const response = yield call(editTrxApi, params.payload);
    if (response) {
      switch (response.status) {
        case 200:
          yield put(editTrxSuccess(response.data));
          break;
        case 404:
          yield put(editTrxFailed(response.data));
          break;
        default:
      }
    }
  } catch (error) {
    if (error.response) {
      yield put(editTrxFailed(error.response));
    }
  }
}

function* updateTrxSaga(params) {
  try {
    const response = yield call(updateTrxApi, { ...params.payload });
    if (response) {
      switch (response.status) {
        case 200:
          yield put(updateTrxSuccess(response.data));
          break;

        default:
      }
    }
  } catch (error) {
    if (error.response) {
      switch (error.response.status) {
        case 403:
          yield put(updateTrxFailed(error.response));
          break;
        case 404:
          yield put(updateTrxFailed(error.response));
          break;
        case 500:
          yield put(updateTrxFailed(error.response));
          break;
        default:
      }
    }
  }
}

export default [
  takeEvery(GET_TRX, getTrxSaga),
  takeLatest(ADD_TRX, addTrxSaga),
  takeLatest(DELETE_TRX, deleteTrxSaga),
  takeLatest(EDIT_TRX, editTrxSaga),
  takeLatest(UPDATE_TRX, updateTrxSaga),
];
