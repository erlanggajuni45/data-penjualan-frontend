import * as CONST from '../Constants/trxConstants';
import * as STATE from '../InitialStates/trxInitialStates';

const initialState = {
  ...STATE.trxInitialState,
  action: '',
};

export const trxReducer = (state = initialState, action) => {
  const { type, payload } = action;

  const actions = {
    [CONST.GET_TRX]: () => ({
      ...state,
      trxFetch: true,
      trxParams: payload,
      action: type,
    }),
    [CONST.GET_TRX_SUCCESS]: () => ({
      ...state,
      trxFetch: false,
      trxResponse: payload,
      action: type,
    }),
    [CONST.GET_TRX_FAILED]: () => ({
      ...state,
      trxFetch: false,
      trxError: payload,
      action: type,
    }),
    [CONST.ADD_TRX]: () => ({
      ...state,
      trxFetch: true,
      trxParams: payload,
      action: type,
    }),
    [CONST.ADD_TRX_SUCCESS]: () => ({
      ...state,
      trxFetch: false,
      trxResponse: payload,
      action: type,
    }),
    [CONST.ADD_TRX_FAILED]: () => ({
      ...state,
      trxFetch: false,
      trxError: payload,
      action: type,
    }),
    [CONST.DELETE_TRX]: () => ({
      ...state,
      trxFetch: true,
      trxParams: payload,
      action: type,
    }),
    [CONST.DELETE_TRX_SUCCESS]: () => ({
      ...state,
      trxFetch: false,
      trxResponse: payload,
      action: type,
    }),
    [CONST.DELETE_TRX_FAILED]: () => ({
      ...state,
      trxFetch: false,
      trxError: payload,
      action: type,
    }),
    [CONST.EDIT_TRX]: () => ({
      ...state,
      trxFetch: true,
      trxParams: payload,
      action: type,
    }),
    [CONST.EDIT_TRX_SUCCESS]: () => ({
      ...state,
      trxFetch: false,
      trxResponse: payload,
      action: type,
    }),
    [CONST.EDIT_TRX_FAILED]: () => ({
      ...state,
      trxFetch: false,
      trxResponse: payload,
      action: type,
    }),
    [CONST.UPDATE_TRX]: () => ({
      ...state,
      trxFetch: true,
      trxParams: payload,
      action: type,
    }),
    [CONST.UPDATE_TRX_SUCCESS]: () => ({
      ...state,
      trxFetch: false,
      trxResponse: payload,
      action: type,
    }),
    [CONST.UPDATE_TRX_FAILED]: () => ({
      ...state,
      trxFetch: false,
      trxError: payload,
      action: type,
    }),
    [CONST.CLEAR_TRX_RESPONSE]: () => ({
      ...state,
      trxFetch: false,
      trxParams: '',
      trxResponse: '',
      trxError: '',
      action: '',
    }),
    DEFAULT: () => state,
  };

  return (actions[type] || actions.DEFAULT)();
};
