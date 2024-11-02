'use client';

// import { getSearchProduct } from '@redux/slices/slice';
import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useAppDispatch } from 'src/hook/rtkHook';
import { useRouter } from 'next/navigation';

const Search = () => {
  const router = useRouter();
  const searchInput = useRef(null);

  const handleSearch = () => {
    // Переход на страницу с поисковым запросом в URL
    router.push(`1?search=${searchInput.current.value}`);
  };
  return (
    <div className="flex justify-center mb-8">
      <input
        className="w-full p-4 bg-slate-200 rounded-md"
        type="text"
        placeholder="Search"
        ref={searchInput}
      />
      <button className="bg-slate-400 px-8 text-white" onClick={handleSearch}>
        Поиск
      </button>
    </div>
  );
};

export default Search;
