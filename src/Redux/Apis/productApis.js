import { api } from '.';

export const getProductApi = () => {
  return api.get('/products');
};

export const getDetailApi = (payload) => {
  return api.get(`/products/detail/${payload}`);
};

export const addProductApi = (payload) => {
  return api.post('/products', { ...payload });
};

export const deleteProductApi = (payload) => {
  return api.delete(`/products/${payload}`);
};

export const editProductApi = (payload) => {
  return api.get(`/products/edit/${payload}`);
};

export const updateProductApi = (payload) => {
  return api.put(`/products/edit/${payload.id_barang}`, { ...payload });
};
