'use client';
import { ProductI } from '@interfaces/ProductI';
import { edit, fetchSearchProduct, postDeleteProduct } from '@redux/slices/slice';
import Link from 'next/link';
import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useAppDispatch } from 'src/hook/rtkHook';

const EditProductItem = ({ product }: { product: ProductI }) => {
  const dispatch = useAppDispatch();
  const deleteHandler = async () => {
    await dispatch(postDeleteProduct(product.id));
    dispatch(fetchSearchProduct('*'));
  };
  return (
    <>
      <li className="bg-slate-200 p-4">
        <div className="flex justify-between">
          <div>{product.title}</div>
          <div className="w-[30px]">
            <div className="close-cross" onClick={() => deleteHandler()}></div>
          </div>
        </div>
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
