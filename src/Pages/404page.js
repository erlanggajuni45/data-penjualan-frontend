import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div class="bg-gradient-to-r from-purple-300 to-blue-200">
      <div class="w-9/12 m-auto py-16 min-h-screen flex items-center justify-center">
        <div class="bg-white shadow overflow-hidden sm:rounded-lg pb-8">
          <div class="border-t border-gray-200 text-center pt-8">
            <h1 class="text-9xl font-bold text-purple-400">404</h1>
            <h1 class="text-6xl font-medium py-8">
              ups! halaman tidak ditemukan
            </h1>
            <p class="text-2xl pb-8 px-12 font-medium">
              Halaman yang kamu cari tidak tersedia.
            </p>
            <button class="bg-gradient-to-r from-purple-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 text-white font-semibold px-6 py-3 rounded-md mr-6">
              <Link to="/">Beranda</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
