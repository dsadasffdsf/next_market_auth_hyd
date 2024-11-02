import { InitialProduct, ProductI } from '@interfaces/ProductI';

import React, { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from 'src/hook/rtkHook';

import EditProduct from './EditProductItem';
import EditProductItem from './EditProductItem';
import Link from 'next/link';
import Search from '@components/Search';
import Pagination from '@components/Pagination';

const EditProductList = ({ searchProducts }) => {
  // const dispatch = useAppDispatch();
  // const searchInput = useRef(null);
  // const { searchProducts } = useAppSelector((state) => state.productsSlice);

  return (
    <>
      <Link href="/profile/admin/createProduct">
        <div className="btn !w-full text-center shadow-md ">Создать новый продукт</div>
      </Link>
      <ul className="grid grid-cols-3 gap-4 mt-8 min-h-[300px]">
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
