'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import React, { useEffect, useState } from 'react';

const Pagination = ({ count, page }: { count: number; page: number }) => {
  // const router = useRouter();
  // console.log(router);

  const [currentPage, setCurrentPage] = useState(0);
  useEffect(() => {
    setCurrentPage(page);
  }, []);
  let productPerPage = 3;
  console.log(count);

  let totalPage = Math.ceil(count / productPerPage);
  console.log(totalPage);

  let items = [];
  for (let index = 0; index < totalPage; index++) {
    items.push(index + 1);
  }
  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };
  console.log(items);

  return (
    <ul className="mt-8 flex space-x-4 mb-8 justify-self-center">
      {items
        ? items.map((item) => (
            <Link href={`/products/page/${item}`}>
              <li
                key={item}
                className={`p-4 bg-slate-200 select-none cursor-pointer hover:opacity-50 ${
                  currentPage === item ? 'bg-slate-500' : ''
                }`}
                onClick={() => handlePageClick(item)}>
                {item}
              </li>
            </Link>
          ))
        : ''}
    </ul>
  );
};

export default Pagination;
