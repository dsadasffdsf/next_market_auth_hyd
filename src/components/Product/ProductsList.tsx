import React, { useEffect } from 'react';
import Product from '@components/Product/Product';

import { useAppDispatch, useAppSelector } from 'src/hook/rtkHook';
import Link from 'next/link';
import { ProductI } from '@interfaces/ProductI';


export default function ProductsList({ products }: { products: ProductI[] }) {
  return (
    <>
      <ul className="  space-y-8 min-h-[450px]">
        {products
          ? products.map((product) => (
              <Link key={product.id} href={`/products/${product.id} `}>
                <Product product={product} btnTitle="Добавить в корзину" />
              </Link>
            ))
          : ''}
      </ul>
    </>
  );
}
