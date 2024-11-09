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

// Нужен чтобы очищать поле error перед каждым запросом
export const createAsyncThunkWithReset = <Returned, ThunkArg>(
  type: string,
  asyncThunk: (arg: ThunkArg, thunkAPI: any) => Promise<Returned>,
) => {
  return createAsyncThunk<Returned, ThunkArg>(type, async (arg, { dispatch, rejectWithValue }) => {
    dispatch(resetProductError());

    try {
      return await asyncThunk(arg, { dispatch, rejectWithValue });
    } catch (error) {
      console.error(`Error in ${type}:`, error);
      return rejectWithValue(error.response?.data?.message || 'Ошибка');
    }
  });
};

//<res,req>

// Поиск продукта
export const getSearchProduct = createAsyncThunkWithReset<ProductI[], string>(
  'products/getSearchProduct',
  async (searchParams, { rejectWithValue }) => {
    try {
      return await getSearchProductReq(searchParams);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка при поиске продукта');
    }
  },
);

// Редактирование продукта
export const putEditProduct = createAsyncThunkWithReset<ProductI, ProductI>(
  'products/putEditProduct',
  async (editParams, { rejectWithValue }) => {
    try {
      return await putEditProductReq(editParams);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка при редактировании продукта');
    }
  },
);

// Удаление продукта
export const fetchDeleteProduct = createAsyncThunkWithReset<ProductI, string>(
  'products/fetchDeleteProduct',
  async (id, { rejectWithValue }) => {
    try {
      return await fetchDeleteProductReq(id);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка при удалении продукта');
    }
  },
);

// Создание нового продукта
export const postCreateProduct = createAsyncThunkWithReset<ProductI, ProductI>(
  'products/postCreateProduct',
  async (params, { rejectWithValue }) => {
    try {
      return await postCreateProductReq(params);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка при создании продукта');
    }
  },
);

// Добавление продукта в избранное
export const putAddFavoriteProduct = createAsyncThunkWithReset<
  ProductI,
  { productId: string; count: number }
>('products/putAddFavoriteProduct', async ({ productId, count }, { rejectWithValue }) => {
  try {
    return await putAddFavoriteProductReq({ productId, count });
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Ошибка при добавлении в избранное');
  }
});

// Получение продуктов из корзины
export const getBasketProducts = createAsyncThunkWithReset<ProductI[], void>(
  'products/getBasketProducts',
  async (_, { rejectWithValue }) => {
    try {
      return await getBasketProductsReq();
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка при получении корзины');
    }
  },
);

// Удаление продукта из избранного
export const fetchDelFavoriteProduct = createAsyncThunkWithReset<ProductI, string>(
  'products/fetchDelFavoriteProduct',
  async (productId, { rejectWithValue }) => {
    try {
      return await fetchDelFavoriteProductReq(productId);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка при удалении из избранного');
    }
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
    resetProductError: (state) => {
      state.error = null;
    },
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
    //! any
    builder.addCase(putAddFavoriteProduct.rejected, (state, action: PayloadAction<any>) => {
      // const productId = action.meta.arg.productId;

      state.error = action.payload;
    });
  },
});

// Action creators are generated for each case reducer function
export const { edit, resetProductError } = products.actions;

export default products.reducer;
