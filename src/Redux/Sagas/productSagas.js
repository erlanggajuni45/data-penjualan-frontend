import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import {
  ADD_PRODUCT,
  GET_DETAIL,
  GET_PRODUCT,
  DELETE_PRODUCT,
  EDIT_PRODUCT,
  UPDATE_PRODUCT,
} from '../Constants/productConstants';

import {
  addProductApi,
  deleteProductApi,
  getDetailApi,
  getProductApi,
  editProductApi,
  updateProductApi,
} from '../Apis/productApis';

import {
  addProductSuccess,
  addProductFailed,
  getProduct,
  getProductSuccess,
  getProductFailed,
  getDetailSuccess,
  getDetailFailed,
  deleteProductSuccess,
  deleteProductFailed,
  editProductSuccess,
  editProductFailed,
  updateProductSuccess,
  updateProductFailed,
} from '../Actions/productActions';

function* getProductSaga() {
  try {
    const response = yield call(getProductApi);
    if (response) {
      switch (response.status) {
        case 200:
          yield put(getProductSuccess(response.data));
          break;
        case 500:
          yield put(getProductFailed(response.data));
          break;
        default:
      }
    }
  } catch (error) {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          yield put(getProductFailed(error.response));
          break;
        default:
      }
    }
  }
}

function* getDetailSaga(params) {
  try {
    const response = yield call(getDetailApi, params.payload);
    if (response) {
      switch (response.status) {
        case 200:
          yield put(getDetailSuccess(response.data));
          break;
        case 500:
          yield put(addProductFailed(response.data));
          break;
        default:
      }
    }
  } catch (error) {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          yield put(getDetailFailed(error.response));
          break;
        default:
      }
    }
  }
}

function* addProductSaga(params) {
  try {
    const response = yield call(addProductApi, { ...params.payload });
    if (response) {
      switch (response.status) {
        case 201:
          yield put(addProductSuccess(response.data));
          break;
        case 500:
          yield put(addProductFailed(response.data));
          break;
        default:
      }
    }
  } catch (error) {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          yield put(addProductFailed(error.response));
          break;
        default:
      }
    }
  }
}

function* deleteProductSaga(params) {
  try {
    const response = yield call(deleteProductApi, params.payload);
    if (response) {
      switch (response.status) {
        case 204:
          yield put(deleteProductSuccess());
          yield put(getProduct());
          break;
        default:
      }
    }
  } catch (error) {
    if (error.response) {
      switch (error.response.status) {
        case 404:
          yield put(deleteProductFailed(error.response.data));
          break;
        default:
      }
    }
  }
}

function* editProductSaga(params) {
  try {
    const response = yield call(editProductApi, params.payload);
    if (response) {
      switch (response.status) {
        case 200:
          yield put(editProductSuccess(response.data));
          break;
        default:
      }
    }
  } catch (error) {
    if (error.response) {
      switch (error.response.status) {
        case 404:
          yield put(editProductFailed(error.response.data));
          break;
        case 500:
          yield put(editProductFailed(error.response.data));
          break;
        default:
      }
    }
  }
}

function* updateProductSaga(params) {
  try {
    const response = yield call(updateProductApi, { ...params.payload });
    if (response) {
      switch (response.status) {
        case 200:
          yield put(updateProductSuccess(response.data));
          break;
        default:
      }
    }
  } catch (error) {
    if (error.response) {
      switch (error.response.status) {
        case 400:
          yield put(updateProductFailed(error.response));
          break;
        case 500:
          yield put(updateProductFailed(error.response));
          break;
        default:
      }
    }
  }
}

export default [
  takeEvery(GET_PRODUCT, getProductSaga),
  takeLatest(GET_DETAIL, getDetailSaga),
  takeLatest(ADD_PRODUCT, addProductSaga),
  takeLatest(DELETE_PRODUCT, deleteProductSaga),
  takeLatest(EDIT_PRODUCT, editProductSaga),
  takeLatest(UPDATE_PRODUCT, updateProductSaga),
];
