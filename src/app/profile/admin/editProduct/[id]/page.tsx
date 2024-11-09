import Edit from '@components/Profile/Edit';
import EditProduct from '@components/Profile/EditProductList';
import { ProductI } from '@interfaces/ProductI';
import { putEditProduct } from '@redux/slices/productSlice';
import React from 'react';

async function page({ params }: { params: { id: string } }) {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/products/${params.id}`);
  const data = await res.json();
  const product: ProductI = data.result.product;
  // console.log(product, '------------------data');

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
