import React, { useCallback, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  getTrx as getTrxProps,
  deleteTrx as deleteTrxProps,
  clearTrxResponse as clearTrxResponseProps,
} from '../Redux/Actions/trxActions';
import toast from 'react-hot-toast';
import PropTypes from 'prop-types';

const ListTrx = (props) => {
  const { trx, isFetched, actionType, getTrx, deleteTrx, clearTrxResponse } =
    props;
  const dispatching = useRef(null);

  useEffect(() => {
    clearTrxResponse();
    getTrx();
  }, [clearTrxResponse, getTrx]);

  useEffect(() => {
    if (actionType === 'DELETE_TRX_SUCCESS') {
      toast.success('berhasil hapus transaksi', {
        id: dispatching.current,
      });
      dispatching.current = null;
      clearTrxResponse();
      getTrx();
    } else if (actionType === 'DELETE_TRX_FAILED') {
      toast.error('gagal menghapus transaksi', {
        id: dispatching.current,
      });
      dispatching.current = null;
    }
  }, [actionType, clearTrxResponse, getTrx]);

  let history = useHistory();

  const handleDeleteTrx = useCallback(
    (event) => {
      dispatching.current = toast.loading('Sedang menghapus produk...');
      let idTrx = parseInt(event.target.value);
      deleteTrx(idTrx);
    },
    [deleteTrx]
  );

  const handleEditTrx = useCallback(
    (event) => {
      const idTrx = parseInt(event.target.value);
      history.push(`/transaksi/edit/${idTrx}`);
    },
    [history]
  );

  const pemisahRibuan = (num) => {
    let num_parts = num.toString().split('.');
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return num_parts.join('.');
  };

  const thclassName =
    'px-2 py-4 text-left bg-cyan-900 text-white text-sm font-medium text-center';
  const tdclassName =
    'px-5 py-8 border-t border-b border-gray-300 text-sm text-center';
  const trclassName = 'bg-slate-100 border-gray-300 even:bg-gray-300';

  return (
    <>
      {trx.length !== 0 ? (
        <section className="w-4/5 py-8 px-14 mx-auto my-32 bg-[#F9F9F9] rounded-md shadow-md drop-shadow-2xl">
          <h2 className="text-2xl font-semibold text-gray-700 text-center capitalize dark:text-white">
            Daftar Transaksi
          </h2>
          <br />
          <div className="overflow-x-auto">
            <table className="w-full table-auto mx-auto rounded-sm border">
              <thead>
                <tr>
                  <th className={thclassName}>No</th>
                  <th className={thclassName}>Nama Barang</th>
                  <th className={thclassName}>Jumlah terjual</th>
                  <th className={thclassName}>Tanggal Transaksi</th>
                  <th className={thclassName}>Jenis Barang</th>
                  <th className={thclassName}>Total</th>
                  <th className={thclassName}>Action</th>
                </tr>
              </thead>
              <tbody>
                {trx.data.map((item, idx) => {
                  const {
                    nama_barang,
                    id_transaksi,
                    harga,
                    jenis_barang,
                    tanggal_transaksi,
                    stok_terjual,
                  } = item;
                  const tgl = new Date(tanggal_transaksi);
                  const dateFormatter = new Intl.DateTimeFormat('id', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  });
                  return (
                    <tr key={idx} className={trclassName}>
                      <td className={tdclassName}>{idx + 1}</td>
                      <td className={tdclassName}>{nama_barang}</td>
                      <td className={tdclassName}>{stok_terjual}</td>
                      <td className={tdclassName}>
                        {dateFormatter.format(tgl)}
                      </td>
                      <td className={tdclassName}>{jenis_barang}</td>
                      <td className={tdclassName}>
                        Rp. {pemisahRibuan(harga * stok_terjual)}
                      </td>
                      <td className={tdclassName}>
                        <button
                          onClick={handleDeleteTrx}
                          type="button"
                          value={id_transaksi}
                          className={`py-2 px-2 mb-2 flex justify-center items-center  bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg ${
                            isFetched ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                          disabled={isFetched}
                        >
                          Hapus
                        </button>

                        <button
                          type="button"
                          onClick={handleEditTrx}
                          value={id_transaksi}
                          className="py-2 px-2 mb-2 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                        >
                          Update
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      ) : (
        ''
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  trx: state.trx.trxResponse,
  isFetched: state.trx.trxFetch,
  actionType: state.trx.action,
});

const mapDispatchToProps = {
  getTrx: () => getTrxProps(),
  deleteTrx: (payload) => deleteTrxProps(payload),
  clearTrxResponse: () => clearTrxResponseProps(),
};

export default connect(mapStateToProps, mapDispatchToProps)(ListTrx);

ListTrx.propTypes = {
  trx: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
  isFetched: PropTypes.bool.isRequired,
  actionType: PropTypes.string.isRequired,
  getTrx: PropTypes.func.isRequired,
  deleteTrx: PropTypes.func.isRequired,
  clearTrxResponse: PropTypes.func.isRequired,
};
