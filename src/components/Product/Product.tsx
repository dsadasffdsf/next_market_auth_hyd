'use client';

import Counter from '@components/Counter';
import { ProductI } from '@interfaces/ProductI';
import { putAddFavoriteProduct, fetchDelFavoriteProduct } from '@redux/slices/productSlice';
import { getSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'src/hook/rtkHook';

const Product = ({ product, btnTitle }: { product: ProductI; btnTitle: string }) => {
  const { id, title, description, price } = product;
  const pathname = usePathname();
  // console.log(pathname.split('/')[1]);
  const error = useAppSelector((state) => state.productsSlice.error);

  const dispatch = useAppDispatch();
  const [count, setCount] = useState(1);

  useEffect(() => {
    if (product.count) {
      setCount(product.count);
    } else {
      setCount(1);
    }
  }, []);

  const countHandler = (count: number) => {
    setCount(count);
    if (pathname.split('/')[1] === 'basket') {
      // console.log(count, 'coooooooount---------');

      dispatch(putAddFavoriteProduct({ productId: id, count }));
    }
  };
  const favoriteHandler = async (e) => {
    //!
    e.preventDefault();
    // const session = await getSession();

    if (pathname.split('/')[1] === 'products') {
      dispatch(putAddFavoriteProduct({ productId: id, count }));
    } else if (pathname.split('/')[1] === 'basket') {
      dispatch(fetchDelFavoriteProduct(id));
    }
  };
  return (
    <li className="shadow-md group cursor-pointer p-4 relative">
      <div className="flex">
        <div className="min-w-[70%] min-h-[120px]">
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
        </div>
      </div>
    </li>
  );
};

export default Product;
