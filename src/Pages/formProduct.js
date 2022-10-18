/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useRef } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  addProduct as addProductProps,
  getProduct as getProductProps,
  editProduct as editProductProps,
  updateProduct as updateProductProps,
} from '../Redux/Actions/productActions';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import PropTypes from 'prop-types';

const FormProduct = (props) => {
  const {
    product,
    isFetched,
    actionType,
    addProduct,
    getProduct,
    editProduct,
    updateProduct,
  } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      name: '',
      stock: '',
      type: '',
      price: '',
    },
  });

  const { idProduct } = useParams();
  const history = useHistory();
  const nav = useRef(false);
  const dispatching = useRef(null);

  useEffect(() => {
    if (idProduct !== undefined) {
      editProduct(idProduct);
    }
    return () => {};
  }, [idProduct, history]);

  useEffect(() => {
    if (
      actionType === 'ADD_PRODUCT_SUCCESS' ||
      actionType === 'UPDATE_PRODUCT_SUCCESS'
    ) {
      switch (actionType) {
        case 'ADD_PRODUCT_SUCCESS':
          toast.success(`Barang berhasil ditambahkan`, {
            id: dispatching.current,
          });
          break;
        case 'ADD_PRODUCT_FAILED':
          toast.error('Barang gagal ditambahkan', {
            id: dispatching.current,
          });
          break;
        case 'UPDATE_PRODUCT_SUCCESS':
          toast.success(`Barang berhasil diupdate`, {
            id: dispatching.current,
          });
          break;
        case 'UPDATE_PRODUCT_FAILED':
          toast.error('Barang gagal diupdate', {
            id: dispatching.current,
          });
          break;
        default:
      }
      getProduct();
      reset({
        name: '',
        stock: '',
        type: '',
      });
      nav.current = true;
    } else if (
      actionType === 'ADD_PRODUCT_FAILED' ||
      actionType === 'UPDATE_PRODUCT_FAILED'
    ) {
      switch (actionType) {
        case 'ADD_PRODUCT_FAILED':
          toast.error('Barang gagal ditambahkan', {
            id: dispatching.current,
            duration: 3000,
          });
          break;
        case 'UPDATE_PRODUCT_FAILED':
          toast.error('Barang gagal diupdate', {
            id: dispatching.current,
            duration: 3000,
          });
          break;
        default:
      }
    }

    if (actionType === 'EDIT_PRODUCT_SUCCESS') {
      product.data.map((item) => {
        setValue('name', item.nama_barang);
        setValue('stock', item.stok);
        setValue('type', item.jenis_barang);
        setValue('price', item.harga);
      });
    }

    if (actionType === 'GET_PRODUCT_SUCCESS' && nav.current === true) {
      history.push('/barang');
    }
  }, [addProduct, actionType]);

  const handleSubmitProduct = useCallback(() => {
    const nama_barang = getValues('name');
    const stok = getValues('stock');
    const jenis_barang = getValues('type');
    const harga = getValues('price');
    const sendData = {
      id_barang: idProduct,
      nama_barang,
      stok,
      jenis_barang,
      harga,
    };

    if (idProduct === undefined) {
      dispatching.current = toast.loading(
        `Tambah barang ${getValues('name')}...`
      );
      addProduct(sendData);
    } else {
      dispatching.current = toast.loading(
        `Update barang ${getValues('name')}...`
      );
      updateProduct(sendData);
    }
  }, [addProduct, updateProduct]);

  return (
    <section className="max-w-4xl p-6 mx-auto my-32 bg-white rounded-md shadow-md drop-shadow-2xl">
      <h2 className="text-2xl font-semibold text-gray-700 text-center capitalize dark:text-white">
        {idProduct !== undefined ? 'Update' : 'Tambah'} Data Barang
      </h2>
      <br />
      <form onSubmit={handleSubmit(handleSubmitProduct)}>
        <div>
          <label className="text-gray-700">Nama Barang</label>
          <input
            {...register('name', {
              required: 'Nama barang tidak boleh kosong',
            })}
            className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-400 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring ${
              errors.name?.message &&
              'border-red-300 focus:border-red-500 focus:ring-red-400'
            }`}
          />
          <p className="text-red-700">{errors.name?.message}</p>
        </div>

        <div>
          <label className="text-gray-700">Stok</label>
          <input
            type="number"
            min="0"
            {...register('stock', {
              required: 'Stok tidak boleh kosong',
              min: {
                value: 1,
                message: 'Stok harus lebih besar dari 0',
              },
            })}
            className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-400 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring ${
              errors.stock?.message &&
              'border-red-300 focus:border-red-500 focus:ring-red-400'
            }`}
          />
          <p className="text-red-700">{errors.stock?.message}</p>
        </div>

        <div>
          <label className="text-gray-700">Jenis Barang</label>
          <input
            {...register('type', {
              required: 'Jenis barang tidak boleh kosong',
            })}
            className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-400 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring ${
              errors.type?.message &&
              'border-red-300 focus:border-red-500 focus:ring-red-400'
            }`}
          />
          <p className="text-red-700">{errors.type?.message}</p>
        </div>
        <div>
          <label className="text-gray-700">Harga (Rp.)</label>
          <input
            type="number"
            min="0"
            {...register('price', {
              required: 'Harga harus diisi',
              min: {
                value: 1,
                message: 'Stok harus lebih besar dari 0',
              },
            })}
            className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-400 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring ${
              errors.harga?.message &&
              'border-red-300 focus:border-red-500 focus:ring-red-400'
            }`}
          />
          <p className="text-red-700">{errors.harga?.message}</p>
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
  isFetched: state.product.productFetch,
  actionType: state.product.action,
});

const mapDispatchToProps = {
  addProduct: (payload) => addProductProps(payload),
  getProduct: () => getProductProps(),
  editProduct: (payload) => editProductProps(payload),
  updateProduct: (payload) => updateProductProps(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(FormProduct);

FormProduct.propTypes = {
  product: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
  isFetched: PropTypes.bool.isRequired,
  actionType: PropTypes.string.isRequired,
  addProduct: PropTypes.func.isRequired,
  getProduct: PropTypes.func.isRequired,
  editProduct: PropTypes.func.isRequired,
  updateProduct: PropTypes.func.isRequired,
};
