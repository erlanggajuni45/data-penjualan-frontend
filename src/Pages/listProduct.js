import React, { useCallback, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  clearProductResponse as clearProductResponseProps,
  deleteProduct as deleteProductProps,
  getProduct as getProductProps,
} from '../Redux/Actions/productActions';
import toast from 'react-hot-toast';
import PropTypes from 'prop-types';

const ListProduct = (props) => {
  const {
    product,
    isFetched,
    actionType,
    getProduct,
    deleteProduct,
    clearProductResponse,
  } = props;
  const dispatching = useRef(null);

  useEffect(() => {
    clearProductResponse();
    getProduct();
  }, [getProduct, clearProductResponse]);

  useEffect(() => {
    if (actionType === 'DELETE_PRODUCT_SUCCESS') {
      toast.success('berhasil hapus produk', {
        id: dispatching.current,
      });
      dispatching.current = null;
    } else if (actionType === 'DELETE_PRODUCT_FAILED') {
      toast.error('gagal menghapus produk', {
        id: dispatching.current,
      });
      dispatching.current = null;
    }
  }, [actionType]);

  let history = useHistory();

  const handleDeleteProduct = useCallback(
    (event) => {
      dispatching.current = toast.loading('Sedang menghapus produk...');
      let idProduct = parseInt(event.target.value);
      deleteProduct(idProduct);
    },
    [deleteProduct]
  );

  const pemisahRibuan = (num) => {
    let num_parts = num.toString().split('.');
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return num_parts.join('.');
  };

  const handleEditProduct = useCallback(
    (event) => {
      const idProduct = parseInt(event.target.value);
      history.push(`/barang/edit/${idProduct}`);
    },
    [history]
  );
  const thclassName =
    'px-1 py-4 text-left bg-cyan-900 text-white text-sm font-medium text-center';
  const tdclassName =
    'px-5 py-8 border-t border-b border-gray-300 text-sm text-center';
  const trclassName = 'bg-slate-100 border-gray-300 even:bg-gray-300';

  return (
    <>
      {product.length !== 0 ? (
        <section className="max-w-6xl py-8 px-14 mx-auto my-32 bg-[#F9F9F9] rounded-md shadow-md drop-shadow-2xl">
          <h2 className="text-2xl font-semibold text-gray-700 text-center capitalize">
            Daftar Barang
          </h2>
          <br />
          <table className="w-11/12 table-auto mx-auto rounded-sm border">
            <thead>
              <tr>
                <th className={thclassName}>No</th>
                <th className={thclassName}>Nama Barang</th>
                <th className={thclassName}>Stok</th>
                <th className={thclassName}>Jenis Barang</th>
                <th className={thclassName}>Harga Satuan</th>
                <th className={thclassName}>Action</th>
              </tr>
            </thead>
            <tbody>
              {product.data.map((item, idx) => {
                const { id_barang, nama_barang, stok, jenis_barang, harga } =
                  item;
                return (
                  <tr key={id_barang} className={trclassName}>
                    <td className={tdclassName}>{idx + 1}</td>
                    <td className={tdclassName}>{nama_barang}</td>
                    <td className={tdclassName}>{stok}</td>
                    <td className={tdclassName}>{jenis_barang}</td>
                    <td className={tdclassName}>Rp. {pemisahRibuan(harga)}</td>
                    <td className={tdclassName}>
                      <button
                        onClick={handleDeleteProduct}
                        type="button"
                        value={id_barang}
                        className={`py-2 px-1 mb-2 flex justify-center items-center  bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg ${
                          isFetched ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        disabled={isFetched}
                      >
                        Hapus
                      </button>

                      <button
                        type="button"
                        onClick={handleEditProduct}
                        value={id_barang}
                        className="py-2 px-1 mb-2 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      ) : (
        ''
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  product: state.product.productResponse,
  isFetched: state.product.productFetch,
  actionType: state.product.action,
});

const mapDispatchToProps = {
  getProduct: () => getProductProps(),
  deleteProduct: (payload) => deleteProductProps(payload),
  clearProductResponse: () => clearProductResponseProps(),
};

export default connect(mapStateToProps, mapDispatchToProps)(ListProduct);

ListProduct.propTypes = {
  product: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
  isFetched: PropTypes.bool.isRequired,
  actionType: PropTypes.string.isRequired,
  getProduct: PropTypes.func.isRequired,
  deleteProduct: PropTypes.func.isRequired,
  clearProductResponse: PropTypes.func.isRequired,
};
