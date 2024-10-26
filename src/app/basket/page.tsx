'use client';
// Не вижу смысла быть тут сервером
import BasketList from '@components/Basket/BasketList';
import { fetchBasketProducts } from '@redux/slices/slice';

import React, { useEffect } from 'react';
import { useAppDispatch } from 'src/hook/rtkHook';
//! Так ,что я понял . Из-за того что я храню баскет в токене , а он не меняется получается такая фигня.Фаворитов в токене хранить нельзя.Делаем просто запрос к бд и через id пользователя получаем его фаворитов
function Basket() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchBasketProducts());
  }, []);
  
  return <BasketList />;
}

export default Basket;
