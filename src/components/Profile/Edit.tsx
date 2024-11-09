'use client';
//! Не уверен что проверяются права администратора на сервере (при создании,изменении),надо будет проверить
import InputForForm from '@components/HtmlElements/InputForForm';
import { ProductI } from '@interfaces/ProductI';
import { postCreateProduct, putEditProduct } from '@redux/slices/productSlice';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from 'src/hook/rtkHook';
import { validationError } from 'src/utils/validator';
import { v4 as uuidv4 } from 'uuid';
//! логику проверки забрать из баскет , можнообойтись без param key
const Edit = ({
  product,
  btnName,
  paramKey,
}: {
  product?: ProductI;
  btnName: string;
  paramKey: string;
}) => {
  // const { editProduct } = useAppSelector((state) => state.productsSlice);
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState({ value: '', valid: false });
  const [description, setDescription] = useState({ value: '', valid: false });
  const [price, setPrice] = useState({ value: '', valid: false });

  useEffect(() => {
    if (product) {
      setTitle({ value: product.title, valid: false });
      setDescription({ value: product.description, valid: false });
      setPrice({ value: product.price.toString(), valid: false });
    }
  }, []);

  const titleHandler = useCallback(({ value, valid }: { value: string; valid: boolean }) => {
    setTitle({ value, valid });
  }, []);
  const descriptionHandler = useCallback(({ value, valid }: { value: string; valid: boolean }) => {
    setDescription({ value, valid });
  }, []);
  const priceHandler = useCallback(({ value, valid }: { value: string; valid: boolean }) => {
    setPrice({ value, valid });
  }, []);

  const changeProductHandler = (event: React.FormEvent) => {
    event.preventDefault();

    // нужна проверка на наличие
    //+! Вот почему id опциональный

    if (title.valid && description.valid && price.valid) {
      const changedProduct: ProductI = {
        title: title.value,
        description: description.value,
        price: parseFloat(price.value),
      };
      // console.log(changedProduct, '------------changedProduct----------------');

      if (paramKey === 'edit') {
        dispatch(putEditProduct({ ...changedProduct, id: product.id }));
        alert('Продукт успешно изменен');
      } else if (paramKey === 'create') {
        console.log('Create Product - params ----------', changedProduct);

        dispatch(postCreateProduct(changedProduct));
        alert('Продукт успешно добавлен');
      }
    }
  };

  return (
    <>
      <form
        action="#"
        className="shadow-lg flex flex-col space-y-4 p-4"
        onSubmit={changeProductHandler}>
        <ul>
          <InputForForm
            type="title"
            placeholder="Введите заголовок"
            value={title}
            validHandler={titleHandler}
          />
          <InputForForm
            type="description"
            placeholder="Введите описание"
            value={description}
            validHandler={descriptionHandler}
          />
          <InputForForm
            type="price"
            placeholder="Введите цену"
            value={price}
            validHandler={priceHandler}
          />
        </ul>
        <button type="submit" className="btn">
          {btnName}
        </button>
      </form>
    </>
  );
};

export default Edit;
