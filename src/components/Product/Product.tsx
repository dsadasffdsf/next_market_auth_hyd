'use client';

import Counter from '@components/Counter';
import { ProductI } from '@interfaces/ProductI';
import { fetchAddFavoriteProduct, fetchDelFavoriteProduct } from '@redux/slices/slice';
import { getSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useAppDispatch } from 'src/hook/rtkHook';

const Product = ({ product, btnTitle }: { product: ProductI; btnTitle: string }) => {
  const { id, title, description, price } = product;
  const pathname = usePathname();
  console.log(pathname.split('/')[1]);

  

  const [error, setError] = useState('');
  const dispatch = useAppDispatch();
  const [count, setCount] = useState(1);
  const countHandler = (count: number) => {
    setCount(count);
  };
  const favoriteHandler = async (e) => {
    e.preventDefault();
    const session = await getSession();
    if (session) {
      if (pathname.split('/')[1] === 'products') {
        dispatch(fetchAddFavoriteProduct({ productId: id, count }));
      } else if (pathname.split('/')[1] === 'basket') {
        dispatch(fetchDelFavoriteProduct(id));
      }
    } else {
      setError('Сперва авторизуйтесь');
    }
  };
  return (
    <li className="shadow-md group cursor-pointer p-8 relative">
      <div className="flex">
        <div className="min-w-[70%] ">
          <div className="flex group-hover:opacity-50">
            <div>{id}.</div>
            <div className="ml-4">{title}</div>
          </div>
          <div>
            <div className="group-hover:opacity-50">
              <div>{description}</div>
              <div>{price} $</div>
            </div>

            <div className="mt-4 text-red-500">{error}</div>
          </div>
        </div>
        <div className="self-center">
          <Counter countHandler={countHandler} initialCount={count} />
        </div>
        <div className="w-full flex justify-end">
          <button className="bg-slate-400 hover:opacity-70" onClick={(e) => favoriteHandler(e)}>
            {btnTitle}
          </button>
          {/* <div className="heart-container ">
            <div className="heart" onClick={(e) => favoriteHandler(e)}></div>
          </div> */}
        </div>
      </div>
    </li>
  );
};

export default Product;
