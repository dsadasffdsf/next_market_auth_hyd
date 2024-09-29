import Edit from '@components/Profile/Edit';
import EditProduct from '@components/Profile/EditProductList';
import { ProductI } from '@interfaces/ProductI';
import React from 'react';

async function page({ params }: { params: { id: string } }) {
  const res = await fetch(`http://localhost:3000/api/products/${params.id}`);
  const product: ProductI = await res.json();

  return (
    <>
      {product ? (
        <div>
          <Edit product={product} />
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}

export default page;
