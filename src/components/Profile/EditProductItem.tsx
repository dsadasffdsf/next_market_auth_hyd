'use client';
import { ProductI } from '@interfaces/ProductI';
import { edit } from '@redux/slices/slice';
import Link from 'next/link';
import React, { FC } from 'react';
import { useDispatch } from 'react-redux';

const EditProductItem = ({ product }: { product: ProductI }) => {
  const dispatch = useDispatch();
  return (
    <>
      <li className="bg-slate-200 p-4">
        <div>{product.title}</div>
        <Link
          href={`/profile/admin/editProduct/${product.id}`}
          onClick={() => console.log(dispatch(edit(product)))}>
          <span className="text-blue-400 cursor-pointer hover:opacity-50">edit</span>
        </Link>
      </li>
    </>
  );
};

export default EditProductItem;
