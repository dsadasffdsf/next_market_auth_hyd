import { ProductI } from '@interfaces/ProductI';
import { apiRequest } from '../apiReq';

//!+Вроде и костыль ,но задачи закрывает . 1) Сюда я могу (сейчас) дотянуться тестами 2)Привести данные к удобному виду для rtk слайса и типизация там теперь выглядит приемлемо

// Поиск продукта //! может отвалиться,есть аналог
export const getSearchProductReq = async (searchParams: string, bearerToken?: string) => {
  const res = await apiRequest<{ products: ProductI[] }>({
    url: `/products?search[title]=${searchParams}&limit=${9}&skip=${0}`,
    method: 'get',
    bearerToken,
  });
  return res.products;
};

// Редактирование продукта
export const putEditProductReq = async (editParams: ProductI, bearerToken?: string) => {
  const res = await apiRequest<{ product: ProductI }>({
    url: `/products/${editParams.id}`,
    method: 'put',
    data: editParams,
    bearerToken,
  });
  return res.product;
};

// Удаление продукта
export const fetchDeleteProductReq = async (id: string, bearerToken?: string) => {
  const res = await apiRequest<{ product: ProductI }>({
    url: `/products/${id}`,
    method: 'delete',
    bearerToken,
  });
  return res.product;
};

// Создание нового продукта
export const postCreateProductReq = async (params: ProductI, bearerToken?: string) => {
  const res = await apiRequest<{ product: ProductI }>({
    url: `/products`,
    method: 'post',
    data: params,
    bearerToken,
  });
  return res.product;
};

// Добавление продукта в избранное
export const putAddFavoriteProductReq = async ({ productId, count }, bearerToken?: string) => {
  const res = await apiRequest<{ product: ProductI }>({
    url: `/products/${productId}/favorite`,
    method: 'put',
    data: { count },
    bearerToken,
  });
  return res.product;
};

// Удаление продукта из избранного
export const fetchDelFavoriteProductReq = async (productId: string, bearerToken?: string) => {
  const res = await apiRequest<{ product: ProductI }>({
    url: `/products/${productId}/favorite`,
    method: 'delete',
    bearerToken,
  });
  return res.product;
};

// Получение продуктов из корзины
export const getBasketProductsReq = async (bearerToken?: string) => {
  const res = await apiRequest<{ products: ProductI[] }>({
    url: `/products/basket`,
    method: 'get',
    bearerToken,
  });
  return res.products;
};
