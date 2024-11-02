import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { InitialProduct, ProductI } from '@interfaces/ProductI';

import { getToken } from 'next-auth/jwt';
import Cookies from 'js-cookie';
import { apiRequest } from 'src/http/apiReq';
import {
  getSearchProductReq,
  fetchDeleteProductReq,
  putEditProductReq,
  postCreateProductReq,
  putAddFavoriteProductReq,
  getBasketProductsReq,
  fetchDelFavoriteProductReq,
} from '@http/req/fetchProduct';

//<res,req>
// Поиск продукта
export const getSearchProduct = createAsyncThunk<ProductI[], string>(
  'products/getSearchProduct',
  async (searchParams) => {
    return await getSearchProductReq(searchParams);
  },
);

// Редактирование продукта
export const putEditProduct = createAsyncThunk<ProductI, ProductI>(
  'products/putEditProduct',
  async (editParams) => {
    return await putEditProductReq(editParams);
  },
);

// Удаление продукта
//! Удаление не добавлено в клиент
export const fetchDeleteProduct = createAsyncThunk<ProductI, string>(
  'products/fetchDeleteProduct',
  async (id) => {
    return await fetchDeleteProductReq(id);
  },
);

// Создание нового продукта
export const postCreateProduct = createAsyncThunk<ProductI, ProductI>(
  'products/postCreateProduct',
  async (params) => {
    return await postCreateProductReq(params);
  },
);

// Добавление продукта в избранное
export const putAddFavoriteProduct = createAsyncThunk<
  ProductI,
  { productId: string; count: number }
>('products/putAddFavoriteProduct', async ({ productId, count }) => {
  return await putAddFavoriteProductReq({ productId, count });
});

// Получение продуктов из корзины
export const getBasketProducts = createAsyncThunk<ProductI[], void>(
  'products/getBasketProducts',
  async () => {
    return await getBasketProductsReq();
  },
);

// Удаление продукта из избранного
export const fetchDelFavoriteProduct = createAsyncThunk<ProductI, string>(
  'products/fetchDelFavoriteProduct',
  async (productId) => {
    return await fetchDelFavoriteProductReq(productId);
  },
);

const initialState: InitialProduct = {
  basket: [],
  searchProducts: [],
  totalPrice: 0,
  editProduct: null,
  error: null,
};

export const products = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // addBasket: (state, action: PayloadAction<ProductI>) => {
    //   const currentProduct = action.payload;
    //   const rep = state.basket.some((product) => product.id === currentProduct.id);
    //   if (rep) {
    //     state.basket = state.basket.filter((product) => {
    //       product.id != currentProduct.id;
    //     });
    //   } else {
    //     state.basket.push(currentProduct);
    //   }
    // },
    edit: (state, action: PayloadAction<ProductI>) => {
      state.editProduct = action.payload;
    },
    // basketTotalPrice: (state) => {

    // },
  },
  extraReducers: (builder) => {
    builder.addCase(getSearchProduct.fulfilled, (state, action: PayloadAction<ProductI[]>) => {
      state.searchProducts = action.payload;
    });
    builder.addCase(getBasketProducts.fulfilled, (state, action: PayloadAction<ProductI[]>) => {
      // console.log(action.payload, '----------------------acacac');

      state.basket = action.payload;

      const total = state.basket.reduce(
        (accumulator, currentValue) => accumulator + currentValue.count * currentValue.price,
        0,
      );
      // console.log(total, '--------------');

      state.totalPrice = total;
    });
    builder.addCase(
      //! мб стоит разделить и нужно переименовать?
      putAddFavoriteProduct.fulfilled,
      (state, action: PayloadAction<ProductI>) => {
        // console.log(action.payload, '-------------------------');
        const isExist = state.basket.some((item) => item.id === action.payload.id);
        if (isExist) {
          state.basket = state.basket.map((item) => {
            if (item.id === action.payload.id) {
              return { ...item, count: action.payload.count };
            }
            return item;
          });
          //! большая нагрузка
          const total = state.basket.reduce(
            (accumulator, currentValue) => accumulator + currentValue.count * currentValue.price,
            0,
          );
          state.totalPrice = total;
        } else {
          state.basket.push(action.payload);
        }
      },
    );
    builder.addCase(fetchDelFavoriteProduct.fulfilled, (state, action: PayloadAction<ProductI>) => {
      console.log(action.payload);

      state.basket = state.basket.filter((item) => {
        return item.id != action.payload.id;
      });
      //!
      const total = state.basket.reduce(
        (accumulator, currentValue) => accumulator + currentValue.count * currentValue.price,
        0,
      );
      state.totalPrice = total;
    });
  },
});

// Action creators are generated for each case reducer function
export const { edit } = products.actions;

export default products.reducer;
