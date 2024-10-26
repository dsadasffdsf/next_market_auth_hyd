'use client';

import Product from '@components/Product/Product';
import { fetchBasketProducts } from '@redux/slices/slice';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'src/hook/rtkHook';

const BasketList = () => {

  const { basket } = useAppSelector((state) => state.productsSlice);
  return (
    <ul>
      {basket
        ? basket.map((product) => (
            <Link key={product.id} href={`products/${product.id} `}>
              <Product product={product} btnTitle="Удалить из корзины" />
            </Link>
          ))
        : ''}
    </ul>
  );
};

export default BasketList;
