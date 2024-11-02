import React from 'react';
import { useAppSelector } from 'src/hook/rtkHook';

const BasketTotalPrice = () => {
  const totalPrice = useAppSelector((state) => state.productsSlice.totalPrice);
  return (
    <div className="p-4 mb-8 shadow-xl inline-block bg-slate-100">
      Total price : <span>{totalPrice} $</span>
    </div>
  );
};

export default BasketTotalPrice;
