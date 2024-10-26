import React, { useEffect } from 'react';
import Product from '@components/Product/Product';

import { useAppDispatch, useAppSelector } from 'src/hook/rtkHook';
import Link from 'next/link';
import { ProductI } from '@interfaces/ProductI';
import Pagination from '@components/Pagination';

export default function ProductsList({ products }: { products: ProductI[] }) {
  // console.log(products);

  // const dispatch = useAppDispatch();
  // const { products } = useAppSelector((state) => state.productsSlice);
  // useEffect(() => {
  //   dispatch(fetchProducts());
  //   console.log('sdf');
  // }, []);

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

// export async function getStaticPaths() {
//   // Получаем все продукты, чтобы создать пути
//   const res = await fetch('https://fakestoreapi.com/products');
//   const products = await res.json();

//   // Создаем массив путей для каждого продукта
//   const paths = products.map((product) => ({
//     params: { id: product.id.toString() }, // id должен быть строкой
//   }));

//   return {
//     paths,
//     fallback: false, // Если false, будет возвращена 404 для несуществующих путей
//   };
// }
