import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { InitialProduct, ProductI } from '@interfaces/ProductI';
import { searchFetch } from 'src/services/req';
import { getToken } from 'next-auth/jwt';
import Cookies from 'js-cookie';

export const fetchSearchProduct = createAsyncThunk<ProductI[], string>(
  'products/fetchSearchProduct',
  async (searchParams) => {
    // const resp = await searchFetch(searchParams);
    try {
      const response = await axios.get<ProductI[]>(
        `http://localhost:3000/api/products?search[title]=${searchParams}`,
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },
);
export const postEditProduct = createAsyncThunk<ProductI, ProductI>(
  'products/postEditProduct',
  async (editParams) => {
    // const resp = await searchFetch(searchParams);
    try {
      const response = await axios.put<ProductI>(`http://localhost:3000/api/products`, editParams);
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },
);
export const postDeleteProduct = createAsyncThunk<string, string>(
  'products/postDeleteProduct',
  async (id) => {
    // const resp = await searchFetch(searchParams);
    try {
      const res = await axios.delete<string>(`http://localhost:3000/api/products/${id}`);
      return res.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },
);
export const fetchCreateProduct = createAsyncThunk<ProductI, ProductI>(
  'products/fetchCreateProduct',
  async (params) => {
    // const resp = await searchFetch(searchParams);
    console.log('начало');

    try {
      const res = await axios.post<ProductI>(`http://localhost:3000/api/products`, params);
      console.log(res, '--------------------add prod');

      return res.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },
);
export const fetchAddFavoriteProduct = createAsyncThunk<
  ProductI,
  { productId: string; count: number }
>('products/fetchCreateProduct', async ({ productId, count }) => {
  // const resp = await searchFetch(searchParams);
  console.log('начало');

  try {
    const token = Cookies.get('next-auth.session-token');
    const res = await axios.put<{ product: ProductI }>(
      `http://localhost:3000/api/products/${productId}/favorite`,
      {
        count,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    // console.log(res.data);

    return res.data.product;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
});
//<Возвращает , получает>
export const fetchBasketProducts = createAsyncThunk<ProductI[], void>(
  'products/fetchBasketProducts',
  async () => {
    try {
      const token = Cookies.get('next-auth.session-token');
      console.log(token);

      const res = await axios.get<{ products: ProductI[] }>(
        `http://localhost:3000/api/products/basket`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(res, '---------------------');

      return res.data.products;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },
);
export const fetchDelFavoriteProduct = createAsyncThunk<ProductI, string>(
  'products/fetchDelFavoriteProduct',
  async (productId) => {
    try {
      const token = Cookies.get('next-auth.session-token');
      const res = await axios.delete<{ product: ProductI }>(
        `http://localhost:3000/api/products/${productId}/favorite`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return res.data.product;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },
);

const initialState: InitialProduct = {
  basket: [],
  searchProducts: [],
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
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSearchProduct.fulfilled, (state, action: PayloadAction<ProductI[]>) => {
      state.searchProducts = action.payload;
    });
    builder.addCase(postDeleteProduct.fulfilled, (state, action: PayloadAction<string>) => {
      console.log(action.payload);
    });
    builder.addCase(fetchBasketProducts.fulfilled, (state, action: PayloadAction<ProductI[]>) => {
      // console.log(action.payload, '----------------------acacac');

      state.basket = action.payload;
    });
    builder.addCase(fetchAddFavoriteProduct.fulfilled, (state, action: PayloadAction<ProductI>) => {
      console.log(action.payload);

      state.basket.push(action.payload);
    });
    builder.addCase(fetchDelFavoriteProduct.fulfilled, (state, action: PayloadAction<ProductI>) => {
      console.log(action.payload);

      state.basket = state.basket.filter((item) => {
        return item.id != action.payload.id;
      });
    });
  },
});

// Action creators are generated for each case reducer function
export const { edit } = products.actions;

export default products.reducer;
