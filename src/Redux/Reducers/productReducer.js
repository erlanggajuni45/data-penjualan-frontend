import * as CONST from '../Constants/productConstants';
import * as STATE from '../InitialStates/productInitialStates';

const initialState = {
  ...STATE.productInitialState,
  action: '',
};

export const productReducer = (state = initialState, action) => {
  const { type, payload } = action;

  const actions = {
    [CONST.GET_PRODUCT]: () => ({
      ...state,
      productFetch: true,
      productParams: payload,
      action: type,
    }),
    [CONST.GET_PRODUCT_SUCCESS]: () => ({
      ...state,
      productFetch: false,
      productResponse: payload,
      action: type,
    }),
    [CONST.GET_PRODUCT_FAILED]: () => ({
      ...state,
      productFetch: false,
      productError: payload,
      action: type,
    }),
    [CONST.GET_DETAIL]: () => ({
      ...state,
      productFetch: true,
      productParams: payload,
      action: type,
    }),
    [CONST.GET_DETAIL_SUCCESS]: () => ({
      ...state,
      productFetch: false,
      productResponse: payload,
      action: type,
    }),
    [CONST.GET_DETAIL_FAILED]: () => ({
      ...state,
      productFetch: false,
      productError: payload,
      action: type,
    }),
    [CONST.ADD_PRODUCT]: () => ({
      ...state,
      productFetch: true,
      productParams: payload,
      action: type,
    }),
    [CONST.ADD_PRODUCT_SUCCESS]: () => ({
      ...state,
      productFetch: false,
      productResponse: payload,
      action: type,
    }),
    [CONST.ADD_PRODUCT_FAILED]: () => ({
      ...state,
      productFetch: false,
      productError: payload,
      action: type,
    }),
    [CONST.DELETE_PRODUCT]: () => ({
      ...state,
      productFetch: true,
      productParams: payload,
      action: type,
    }),
    [CONST.DELETE_PRODUCT_SUCCESS]: () => ({
      ...state,
      productFetch: false,
      action: type,
    }),
    [CONST.DELETE_PRODUCT_FAILED]: () => ({
      ...state,
      productFetch: false,
      productError: payload,
      action: type,
    }),
    [CONST.EDIT_PRODUCT]: () => ({
      ...state,
      productFetch: true,
      productParams: payload,
      action: type,
    }),
    [CONST.EDIT_PRODUCT_SUCCESS]: () => ({
      ...state,
      productFetch: false,
      productResponse: payload,
      action: type,
    }),
    [CONST.EDIT_PRODUCT_FAILED]: () => ({
      ...state,
      productFetch: false,
      productError: payload,
      action: type,
    }),
    [CONST.UPDATE_PRODUCT]: () => ({
      ...state,
      productFetch: true,
      productParams: payload,
      action: type,
    }),
    [CONST.UPDATE_PRODUCT_SUCCESS]: () => ({
      ...state,
      productFetch: false,
      productResponse: payload,
      action: type,
    }),
    [CONST.UPDATE_PRODUCT_FAILED]: () => ({
      ...state,
      productFetch: false,
      productError: payload,
      action: type,
    }),
    [CONST.CLEAR_PRODUCT_RESPONSE]: () => ({
      ...state,
      productParams: '',
      productResponse: '',
      productError: '',
      action: '',
    }),
    DEFAULT: () => state,
  };

  return (actions[type] || actions.DEFAULT)();
};
