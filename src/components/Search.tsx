'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const Search = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchInput = useRef(null);

  const initialSearch = searchParams.get('search') === '*' ? '' : searchParams.get('search') || '';
  const [searchValue, setSearchValue] = useState(initialSearch);

  useEffect(() => {
    if (searchInput.current) {
      searchInput.current.value = searchValue;
    }
  }, [searchValue]);

  const handleSearch = () => {
    setSearchValue(searchInput.current.value);
    router.push(`1?search=${searchInput.current.value || '*'}`);
  };

  return (
    <div className="flex justify-center mb-8">
      <input
        className="w-full p-4 bg-slate-200 rounded-md"
        type="text"
        placeholder="Search"
        ref={searchInput}
        defaultValue={searchValue}
      />
      <button className="bg-slate-400 px-8 text-white" onClick={handleSearch}>
        Поиск
      </button>
    </div>
  );
};

export default Search;
