import React, { useEffect, useRef, useCallback } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { getDetail as getDetailProps } from '../Redux/Actions/productActions';
import { connect } from 'react-redux';
import {
  clearTrxResponse as clearTrxResponseProps,
  deleteTrx as deleteTrxProps,
} from '../Redux/Actions/trxActions';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';

const DetailProduct = (props) => {
  const {
    product,
    isFetched,
    actionType,
    getDetail,
    deleteTrx,
    clearTrxResponse,
  } = props;
  const { idProduct } = useParams();
  const dispatching = useRef(null);
  const history = useHistory();

  useEffect(() => {
    if (idProduct !== undefined) {
      getDetail(idProduct);
      clearTrxResponse();
    }
  }, [idProduct, getDetail, clearTrxResponse]);

  useEffect(() => {
    if (actionType === 'DELETE_TRX_SUCCESS') {
      toast.success('Transaksi berhasil dihapus', {
        id: dispatching.current,
      });
      clearTrxResponse();
      getDetail(idProduct);
    } else if (actionType === 'DELETE_TRX_FAILED') {
      toast.error('Transaksi gagal dihapus', {
        id: dispatching.current,
      });
      clearTrxResponse();
      getDetail(idProduct);
    }
  }, [deleteTrx, actionType, clearTrxResponse, getDetail, idProduct]);

  const handleDeleteTrx = useCallback(
    (event) => {
      const id = parseInt(event.target.value);
      dispatching.current = toast.loading('Menghapus transaksi...');
      deleteTrx(id);
    },
    [deleteTrx]
  );

  const editTrx = (event) => {
    const id = parseInt(event.target.value);
    history.push(`../transaksi/edit/${id}`);
  };

  const thclassName =
    'px-2 py-4 text-left bg-cyan-900 text-white text-sm font-medium';
  const tdclassName = 'px-2 py-2 border-t border-b border-gray-300 text-sm';
  const trclassName = 'bg-slate-100 border-gray-300 even:bg-gray-300';

  const divDetailClassName =
    'bg-gray-50 px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 border-x border-t border-white-200';
  const dtClassName = 'text-sm font-medium text-gray-500';
  const ddClassName = 'mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2';
  return (
    <>
      {product.length !== 0 ? (
        <section className="max-w-6xl py-8 px-14 mx-auto mt-32 mb-16 bg-white rounded-md shadow-md drop-shadow-2xl">
          <h2 className="text-2xl font-semibold text-gray-700 text-center capitalize dark:text-white">
            Detail Barang
          </h2>
          <br />
          {product.data
            .filter((res, idx) => {
              return idx < 1;
            })
            .map((item) => {
              const detail = [
                { title: 'Nama Barang', value: item.nama_barang },
                { title: 'Jenis Barang', value: item.jenis_barang },
                { title: 'Total Stok', value: item.seluruh_stok },
                { title: 'Stok Tersedia', value: item.stok_tersedia },
              ];
              return (
                <>
                  {detail.map((i, idx) => {
                    return (
                      <div key={idx} className={divDetailClassName}>
                        <dt className={dtClassName}>{i.title}</dt>
                        <dd className={ddClassName}>{i.value}</dd>
                      </div>
                    );
                  })}
                </>
              );
            })}
          <br />
          <table className="w-3/4 table-fixed mx-auto rounded-sm border">
            <thead>
              <tr>
                <th className={thclassName}>No</th>
                <th className={thclassName}>Tanggal Transaksi</th>
                <th className={thclassName}>Stok Terjual</th>
                <th className={thclassName}>Action</th>
              </tr>
            </thead>
            <tbody>
              {product.data.map((item, idx) => {
                const dateFormatter = new Intl.DateTimeFormat('id', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                });
                const tgl = new Date(item.tanggal_transaksi);
                return (
                  <>
                    {item.tanggal_transaksi !== null ? (
                      <tr key={idx} className={trclassName}>
                        <td className={tdclassName}>{idx + 1}</td>
                        <td className={tdclassName}>
                          {dateFormatter.format(tgl)}
                        </td>
                        <td className={tdclassName}>{item.stok_terjual}</td>

                        <td className={tdclassName}>
                          <button
                            type="button"
                            value={item.id_transaksi}
                            onClick={handleDeleteTrx}
                            className={`py-2 px-4 mb-2 flex justify-center items-center bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ${
                              isFetched && 'opacity-50 cursor-not-allowed'
                            }`}
                            disabled={isFetched}
                          >
                            Hapus
                          </button>

                          <button
                            type="button"
                            onClick={editTrx}
                            value={item.id_transaksi}
                            className={`py-2 px-4 mb-2 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg ${
                              isFetched && 'opacity-50 cursor-not-allowed'
                            }`}
                            disabled={isFetched}
                          >
                            Update
                          </button>
                        </td>
                      </tr>
                    ) : (
                      <td
                        colSpan={4}
                        className="text-center bg-gray-600 text-white text-3xl py-10"
                      >
                        Belum ada transaksi
                        <Link to="/barang/transaksi">
                          <p className="text-sm underline hover:text-gray-800">
                            Tambah transaksi
                          </p>
                        </Link>
                      </td>
                    )}
                  </>
                );
              })}
            </tbody>
          </table>
        </section>
      ) : (
        <>
          <p className="text-center text-5xl">Data tidak ditemukan</p>
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  product: state.product.productResponse,
  isFetched: state.trx.trxFetch,
  actionType: state.trx.action,
});

const mapDispatchToProps = {
  getDetail: (payload) => getDetailProps(payload),
  deleteTrx: (payload) => deleteTrxProps(payload),
  clearTrxResponse: () => clearTrxResponseProps(),
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailProduct);

DetailProduct.propTypes = {
  product: PropTypes.string.isRequired,
  isFetched: PropTypes.bool.isRequired,
  actionType: PropTypes.string.isRequired,
  getDetail: PropTypes.func.isRequired,
  deleteTrx: PropTypes.func.isRequired,
  clearTrxResponse: PropTypes.func.isRequired,
};
