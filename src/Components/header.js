import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [menuState, setMenuState] = useState(false);

  return (
    <nav className="bg-white fixed top-0 w-full z-10 shadow">
      <div className="container px-6 py-3 mx-auto md:flex">
        <div className="flex items-center justify-between">
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setMenuState(!menuState)}
              className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
              aria-label="toggle menu"
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                <path
                  fillRule="evenodd"
                  d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        <div
          className={`w-full md:flex md:items-center md:justify-between ${
            menuState ? 'block' : 'hidden'
          }`}
        >
          <div
            className="flex flex-col px-2 py-3 -mx-4 md:flex-row md:mx-0 md:py-0"
            onClick={() => setMenuState(false)}
          >
            <Link
              to="/"
              className="px-2 py-1 text-sm font-medium text-gray-700 transition-colors duration-200 transform rounded dark:text-gray-200 hover:bg-gray-900 hover:text-gray-100 md:mx-2"
            >
              Dashboard
            </Link>
            <Link
              to="/barang"
              className="px-2 py-1 text-sm font-medium text-gray-700 transition-colors duration-200 transform rounded dark:text-gray-200 hover:bg-gray-900 hover:text-gray-100 md:mx-2"
            >
              Daftar Barang
            </Link>
            <Link
              to="/barang/tambah"
              className="px-2 py-1 text-sm font-medium text-gray-700 transition-colors duration-200 transform rounded dark:text-gray-200 hover:bg-gray-900 hover:text-gray-100 md:mx-2"
            >
              Tambah Barang
            </Link>
            <Link
              to="/transaksi"
              className="px-2 py-1 text-sm font-medium text-gray-700 transition-colors duration-200 transform rounded dark:text-gray-200 hover:bg-gray-900 hover:text-gray-100 md:mx-2"
            >
              Transaksi Baru
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Header;
