'use client';

import { addBasket } from '@redux/slices/slice';
import React from 'react';
import { useAppDispatch } from 'src/hook/rtkHook';

const Product = ({ product }) => {
  const { id, title, description, price } = product;
  const dispatch = useAppDispatch();
  const favoriteHandler = (e) => {
    e.preventDefault();
    dispatch(addBasket(product));
  };
  return (
    <li className="shadow-md group cursor-pointer p-8 relative">
      <div className="flex">
        <div className="min-w-[90%] group-hover:opacity-50">
          <div className="flex">
            <div>{id}.</div>
            <div className="ml-4">{title}</div>
          </div>
          <div>
            <div>{description}</div>
            <div>{price} $</div>
          </div>
        </div>
        <div className="w-full flex justify-end">
          <div className="heart-container ">
            <div className="heart" onClick={(e) => favoriteHandler(e)}></div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default Product;
