import Edit from '@components/Profile/Edit';
import EditProduct from '@components/Profile/EditProductList';
import { ProductI } from '@interfaces/ProductI';
import { postEditProduct } from '@redux/slices/slice';
import React from 'react';

async function page({ params }: { params: { id: string } }) {
  const res = await fetch(`http://localhost:3000/api/products/${params.id}`);
  const product: ProductI = await res.json();

  return (
    <>
      {product ? (
        <div>
          {/* Key нужен чтобы избежать дублирования компонента Edit ,передать ссылку на  асинхронный запрос rtk через серверный компонент нельзя  */}
          <Edit product={product} btnName="Изменить продукт" paramKey="edit" />
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}

export default page;
