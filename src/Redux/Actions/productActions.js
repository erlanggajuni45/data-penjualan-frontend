import * as CONST from '../Constants/productConstants';

export const getProduct = (payload) => ({
  type: CONST.GET_PRODUCT,
  payload,
});

export const getProductSuccess = (payload) => ({
  type: CONST.GET_PRODUCT_SUCCESS,
  payload,
});

export const getProductFailed = (payload) => ({
  type: CONST.GET_PRODUCT_FAILED,
  payload,
});

export const getDetail = (payload) => ({
  type: CONST.GET_DETAIL,
  payload,
});

export const getDetailSuccess = (payload) => ({
  type: CONST.GET_DETAIL_SUCCESS,
  payload,
});

export const getDetailFailed = (payload) => ({
  type: CONST.GET_DETAIL_FAILED,
  payload,
});

export const addProduct = (payload) => ({
  type: CONST.ADD_PRODUCT,
  payload,
});

export const addProductSuccess = (payload) => ({
  type: CONST.ADD_PRODUCT_SUCCESS,
  payload,
});

export const addProductFailed = (payload) => ({
  type: CONST.ADD_PRODUCT_FAILED,
  payload,
});

export const deleteProduct = (payload) => ({
  type: CONST.DELETE_PRODUCT,
  payload,
});

export const deleteProductSuccess = () => ({
  type: CONST.DELETE_PRODUCT_SUCCESS,
});

export const deleteProductFailed = (payload) => ({
  type: CONST.DELETE_PRODUCT_FAILED,
  payload,
});

export const editProduct = (payload) => ({
  type: CONST.EDIT_PRODUCT,
  payload,
});

export const editProductSuccess = (payload) => ({
  type: CONST.EDIT_PRODUCT_SUCCESS,
  payload,
});

export const editProductFailed = (payload) => ({
  type: CONST.EDIT_PRODUCT_FAILED,
  payload,
});

export const updateProduct = (payload) => ({
  type: CONST.UPDATE_PRODUCT,
  payload,
});

export const updateProductSuccess = (payload) => ({
  type: CONST.UPDATE_PRODUCT_SUCCESS,
  payload,
});

export const updateProductFailed = (payload) => ({
  type: CONST.UPDATE_PRODUCT_FAILED,
  payload,
});

export const clearProductResponse = () => ({
  type: CONST.CLEAR_PRODUCT_RESPONSE,
});
