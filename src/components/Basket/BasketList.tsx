'use client';

import Product from '@components/Product/Product';
import { getBasketProducts } from '@redux/slices/productSlice';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'src/hook/rtkHook';
import BasketTotalPrice from './BasketTotalPrice';

const BasketList = () => {
  const { basket } = useAppSelector((state) => state.productsSlice);
  return (
    <>
      <BasketTotalPrice />
      <ul>
        {basket
          ? basket.map((product) => (
              <Link key={product.id} href={`products/${product.id} `}>
                <Product product={product} btnTitle="Удалить из корзины" />
              </Link>
            ))
          : ''}
      </ul>
    </>
  );
};

export default BasketList;
