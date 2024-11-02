'use client';
//! Не уверен что проверяются права администратора на сервере (при создании,изменении),надо будет проверить
import InputForForm from '@components/HtmlElements/Input';
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

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    if (product) {
      setTitle(product.title);
      setDescription(product.description);
      setPrice(product.price.toString());
    } else {
      setTitle('');
      setDescription('');
      setPrice('');
    }
  }, []);

  const titleHandler = useCallback((titleValue: string) => {
    setTitle(titleValue);
  }, []);
  const descriptionHandler = useCallback((descriptionValue: string) => {
    setDescription(descriptionValue);
  }, []);
  const priceHandler = useCallback((priceValue: string) => {
    setPrice(priceValue);
  }, []);

  const [titleError, setTitleError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [priceError, setPriceError] = useState('');

  const changeProductHandler = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(title, description, price, '----------------');

    const validTitle = validationError({
      data: title,
      setDataError: setTitleError,
      type: 'title',
    });
    const validDesc = validationError({
      data: description,
      setDataError: setDescriptionError,
      type: 'description',
    });
    const validPrice = validationError({
      data: price,
      setDataError: setPriceError,
      type: 'price',
    });
    // нужна проверка на наличие
    if (validTitle && validDesc && validPrice) {
      const changedProduct: ProductI = {
        title: title,
        description: description,
        price: parseFloat(price),
      };
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
            title="title"
            placeholder="Введите заголовок"
            error={titleError}
            value={title}
            onChange={titleHandler}
          />
          <InputForForm
            title="description"
            placeholder="Введите описание"
            error={descriptionError}
            value={description}
            onChange={descriptionHandler}
          />
          <InputForForm
            title="price"
            placeholder="Введите цену"
            error={priceError}
            value={price}
            onChange={priceHandler}
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
