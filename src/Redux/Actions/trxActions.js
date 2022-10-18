import * as CONST from '../Constants/trxConstants';

export const getTrx = (payload) => ({
  type: CONST.GET_TRX,
  payload,
});

export const getTrxSuccess = (payload) => ({
  type: CONST.GET_TRX_SUCCESS,
  payload,
});

export const getTrxFailed = (payload) => ({
  type: CONST.GET_TRX_FAILED,
  payload,
});

export const addTrx = (payload) => ({
  type: CONST.ADD_TRX,
  payload,
});

export const addTrxSuccess = (payload) => ({
  type: CONST.ADD_TRX_SUCCESS,
  payload,
});

export const addTrxFailed = (payload) => ({
  type: CONST.ADD_TRX_FAILED,
  payload,
});

export const deleteTrx = (payload) => ({
  type: CONST.DELETE_TRX,
  payload,
});

export const deleteTrxSuccess = (payload) => ({
  type: CONST.DELETE_TRX_SUCCESS,
  payload,
});

export const deleteTrxFailed = (payload) => ({
  type: CONST.DELETE_TRX_FAILED,
  payload,
});

export const editTrx = (payload) => ({
  type: CONST.EDIT_TRX,
  payload,
});

export const editTrxSuccess = (payload) => ({
  type: CONST.EDIT_TRX_SUCCESS,
  payload,
});

export const editTrxFailed = (payload) => ({
  type: CONST.EDIT_TRX_FAILED,
  payload,
});

export const updateTrx = (payload) => ({
  type: CONST.UPDATE_TRX,
  payload,
});

export const updateTrxSuccess = (payload) => ({
  type: CONST.UPDATE_TRX_SUCCESS,
  payload,
});

export const updateTrxFailed = (payload) => ({
  type: CONST.UPDATE_TRX_FAILED,
  payload,
});

export const clearTrxResponse = () => ({
  type: CONST.CLEAR_TRX_RESPONSE,
});
