'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Pagination = ({ count, page, limit }: { count: number; page: number; limit: number }) => {
  const [currentPage, setCurrentPage] = useState(0);
  useEffect(() => {
    setCurrentPage(page);
  }, [page]);
  //! productPerPage
  const productPerPage = limit;
  const totalPage = Math.ceil(count / productPerPage);
  const maxVisiblePages = 5; // Настройте это значение, чтобы контролировать количество отображаемых страниц

  const getVisiblePages = () => {
    const pages = [];
    const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPage, startPage + maxVisiblePages - 1);

    if (startPage > 1) pages.push(1);
    if (startPage > 2) pages.push('...');
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    if (endPage < totalPage - 1) pages.push('...');
    if (endPage < totalPage) pages.push(totalPage);

    return pages;
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <ul className="mt-8 flex space-x-4 mb-8 justify-self-center">
      {getVisiblePages().map((item, index) =>
        typeof item === 'number' ? (
          <Link href={`${item}`} key={index}>
            <li
              className={`p-4 bg-slate-200 select-none cursor-pointer hover:opacity-50 ${
                currentPage === item ? 'bg-slate-500' : ''
              }`}
              onClick={() => handlePageClick(item)}>
              {item}
            </li>
          </Link>
        ) : (
          <li key={index} className="p-4 select-none text-gray-500">
            {item}
          </li>
        ),
      )}
    </ul>
  );
};

export default Pagination;
