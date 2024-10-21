import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { InitialProduct, ProductI } from '@interfaces/ProductI';
import { searchFetch } from 'src/services/req';

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
    console.log("начало");
    
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

const initialState: InitialProduct = {
  basket: [],
  searchProducts: [],
  editProduct: null,
};

export const products = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addBasket: (state, action: PayloadAction<ProductI>) => {
      const currentProduct = action.payload;
      const rep = state.basket.some((product) => product.id === currentProduct.id);
      if (rep) {
        state.basket = state.basket.filter((product) => {
          product.id != currentProduct.id;
        });
      } else {
        state.basket.push(currentProduct);
      }
    },
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
  },
});

// Action creators are generated for each case reducer function
export const { addBasket, edit } = products.actions;

export default products.reducer;
