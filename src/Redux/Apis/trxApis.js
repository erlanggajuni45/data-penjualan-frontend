import { api } from '.';

export const getTrxApi = () => {
  return api.get('/transactions');
};

export const addTrxApi = (payload) => {
  return api.post('/transactions', { ...payload });
};

export const deleteTrxApi = (payload) => {
  return api.delete(`/transactions/${payload}`);
};

export const editTrxApi = (payload) => {
  return api.get(`/transactions/edit/${payload}`);
};

export const updateTrxApi = (payload) => {
  return api.put(`/transactions/edit/${payload.id_transaksi}`, {
    ...payload,
  });
};
