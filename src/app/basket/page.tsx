'use client';
// Не вижу смысла быть тут сервером
import BasketList from '@components/Basket/BasketList';
import { getBasketProducts } from '@redux/slices/productSlice';

import React, { useEffect } from 'react';
import { useAppDispatch } from 'src/hook/rtkHook';
function Basket() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getBasketProducts());
  }, []);

  return <BasketList />;
}

export default Basket;
