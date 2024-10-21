'use client';

import { InitialProduct, ProductI } from '@interfaces/ProductI';
import { fetchSearchProduct } from '@redux/slices/slice';
import React, { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from 'src/hook/rtkHook';
import { searchFetch } from 'src/services/req';
import EditProduct from './EditProductItem';
import EditProductItem from './EditProductItem';
import Link from 'next/link';

const EditProductList = () => {
  const dispatch = useAppDispatch();
  const searchInput = useRef(null);
  const { searchProducts } = useAppSelector((state) => state.productsSlice);

  useEffect(() => {
    dispatch(fetchSearchProduct(searchInput.current.value));
  }, []);

  const searchHandler = () => {
    dispatch(fetchSearchProduct(searchInput.current.value));
  };

  return (
    <>
      <div className="flex justify-center">
        <input
          className="w-full p-4 bg-slate-200 rounded-md"
          type="text"
          placeholder="Search"
          ref={searchInput}
        />
        <button className="bg-slate-400 px-8 text-white" onClick={() => searchHandler()}>
          Поиск
        </button>
      </div>
      <Link href="/profile/admin/createProduct">
        <div className="btn !w-full text-center mt-4 shadow-md ">Создать новый продукт</div>
      </Link>
      <ul className="grid grid-cols-3 gap-4  mt-8">
        {searchProducts
          ? searchProducts.map((product) => (
              // <div>{product.title}</div>

              <EditProductItem key={product.id} product={product} />
            ))
          : ''}
      </ul>
    </>
  );
};

export default EditProductList;
