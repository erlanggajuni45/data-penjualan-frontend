import React, { useCallback, useEffect, useRef } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  addTrx as addTrxProps,
  editTrx as editTrxProps,
  updateTrx as updateTrxProps,
  clearTrxResponse as clearTrxResponseProps,
} from '../Redux/Actions/trxActions';
import { getProduct as getProductProps } from '../Redux/Actions/productActions';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';

const FormTrx = (props) => {
  const {
    product,
    isFetched,
    trx,
    trxError,
    actionType,
    addTrx,
    getProduct,
    editTrx,
    updateTrx,
    clearTrxResponse,
  } = props;

  const {
    register,
    getValues,
    setValue,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      productID: '',
      dateTrx: '',
      soldStock: '',
    },
  });

  // const disabled = useRef(false);
  const dispatching = useRef(null);

  const { idTransaksi } = useParams();
  const history = useHistory();

  useEffect(() => {
    getProduct();
    clearTrxResponse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (trx) {
      if (
        actionType === 'ADD_TRX_SUCCESS' ||
        actionType === 'UPDATE_TRX_SUCCESS'
      ) {
        toast.success(trx.message, {
          id: dispatching.current,
        });
        history.push('/');
        reset({
          productID: '',
          dateTrx: '',
          soldStock: '',
        });
        clearTrxResponse();
      }
    }

    if (trxError) {
      toast.error(trxError.data.message, {
        id: dispatching.current,
      });
      clearTrxResponse();
    }

    if (actionType === 'EDIT_TRX_SUCCESS') {
      // disabled.current = true;
      // eslint-disable-next-line array-callback-return
      trx.data.map((res) => {
        const { id_barang, tanggal_transaksi, stok_terjual } = res;
        setValue('productID', id_barang);
        setValue('dateTrx', tanggal_transaksi);
        setValue('soldStock', stok_terjual);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trx, trxError, clearTrxResponse]);

  useEffect(() => {
    if (idTransaksi !== undefined) {
      editTrx(idTransaksi);
    }
    return () => {
      // disabled.current = false;
      reset({
        productID: '',
        dateTrx: '',
        soldStock: '',
      });
    };
  }, [editTrx, idTransaksi, reset]);

  const handleSubmitTrx = useCallback(() => {
    const id_barang = getValues('productID');
    const tanggal_transaksi = getValues('dateTrx');
    const stok_terjual = getValues('soldStock');
    const sendData = {
      id_transaksi: idTransaksi,
      id_barang,
      tanggal_transaksi,
      stok_terjual,
    };

    if (idTransaksi !== undefined) {
      dispatching.current = toast.loading('Update transaksi...');
      updateTrx(sendData);
    } else {
      dispatching.current = toast.loading('Tambah transaksi...');
      addTrx(sendData);
    }
  }, [idTransaksi, getValues, addTrx, updateTrx]);

  return (
    <section className="max-w-4xl p-6 mx-auto my-32 bg-white rounded-md shadow-md drop-shadow-2xl">
      <h2 className="text-2xl font-semibold text-gray-700 text-center capitalize dark:text-white">
        {idTransaksi === undefined ? 'Tambah' : 'Update'} Data Transaksi
      </h2>
      <br />
      <form onSubmit={handleSubmit(handleSubmitTrx)}>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
            Barang
          </label>

          <select
            {...register('productID', {
              required: 'Pilih barang terlebih dahulu',
            })}
            disabled={idTransaksi === undefined ? false : true}
            className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-400 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring ${
              errors.productID?.message &&
              'border-red-300 focus:border-red-500 focus:ring-red-400'
            }${idTransaksi !== undefined && 'opacity-50 cursor-not-allowed'}`}
          >
            {product !== null ? (
              <>
                <option value="" disabled>
                  Silahkan pilih...
                </option>
                {product.data.map((item, idx) => {
                  return (
                    <option key={idx} value={item.id_barang}>
                      {item.nama_barang}
                    </option>
                  );
                })}
              </>
            ) : (
              <option disabled>SILAHKAN TAMBAH PRODUK TERLEBIH DAHULU</option>
            )}
          </select>
          <p className="text-red-700">{errors.productID?.message}</p>
        </div>
        <div>
          <label className="text-gray-700">Tanggal Transaksi</label>
          <input
            {...register('dateTrx', { required: 'Belum mengisi tanggal' })}
            type="date"
            className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-400 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring ${
              errors.dateTrx?.message &&
              'border-red-300 focus:border-red-500 focus:ring-red-400'
            }`}
          />
          <p className="text-red-700">{errors.dateTrx?.message}</p>
        </div>

        <div>
          <label className="text-gray-700">Stok Terjual</label>
          <input
            {...register('soldStock', {
              required: 'Stok terjual tidak boleh kosong',
              min: {
                value: 1,
                message: 'Stok terjual harus lebih dari 0',
              },
            })}
            min="0"
            type="number"
            className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-400 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring ${
              errors.soldStock?.message &&
              'border-red-300 focus:border-red-500 focus:ring-red-400'
            }`}
          />
          <p className="text-red-700">{errors.soldStock?.message}</p>
        </div>

        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className={`px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600 ${
              isFetched ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isFetched}
          >
            Submit Data
          </button>
        </div>
      </form>
    </section>
  );
};

const mapStateToProps = (state) => ({
  product: state.product.productResponse,
  trx: state.trx.trxResponse,
  isFetched: state.trx.trxFetch,
  trxError: state.trx.trxError,
  actionType: state.trx.action,
});

const mapDispatchToProps = {
  addTrx: (payload) => addTrxProps(payload),
  getProduct: () => getProductProps(),
  editTrx: (payload) => editTrxProps(payload),
  updateTrx: (payload) => updateTrxProps(payload),
  clearTrxResponse: () => clearTrxResponseProps(),
};

export default connect(mapStateToProps, mapDispatchToProps)(FormTrx);

FormTrx.propTypes = {
  product: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
  trx: PropTypes.string.isRequired,
  trxError: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
    .isRequired,
  isFetched: PropTypes.bool.isRequired,
  actionType: PropTypes.string.isRequired,
  addTrx: PropTypes.func.isRequired,
  getProduct: PropTypes.func.isRequired,
  editTrx: PropTypes.func.isRequired,
  updateTrx: PropTypes.func.isRequired,
  clearTrxResponse: PropTypes.func.isRequired,
};
