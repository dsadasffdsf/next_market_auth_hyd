'use client';

import Product from '@components/Product/Product';
import Link from 'next/link';
import React from 'react';
import { useAppSelector } from 'src/hook/rtkHook';

const BasketList = () => {
  const { basket } = useAppSelector((state) => state.productsSlice);
  return (
    <ul>
      {basket
        ? basket.map((product) => (
            <Link key={product.id} href={`products/${product.id} `}>
              <Product product={product} />
            </Link>
          ))
        : ''}
    </ul>
  );
};

export default BasketList;
