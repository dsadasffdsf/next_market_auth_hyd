<<<<<<< HEAD
import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { InitialProduct, ProductI } from '@interfaces/ProductI';
import { searchFetch } from 'src/services/req';

export const fetchSearchProduct = createAsyncThunk<ProductI[], ProductI>(
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
      const response = await axios.post<ProductI>(`http://localhost:3000/api/products`, editParams);
      return response.data;
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
=======
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { InitialProduct, ProductI } from '@interfaces/ProductI';

// export const fetchProducts = createAsyncThunk<ProductI[], void>(
//   'products/fetchProducts',
//   async () => {
//     const response = await axios.get('https://fakestoreapi.com/products');

//     return response.data;
//   },
// );

const initialState: InitialProduct = {
  basket: [],
>>>>>>> eb18683754f797b649e2be03c3067d2c3586e059
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
<<<<<<< HEAD
    edit: (state, action: PayloadAction<ProductI>) => {
      state.editProduct = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSearchProduct.fulfilled, (state, action: PayloadAction<ProductI[]>) => {
      state.searchProducts = action.payload;
    });
=======
  },
  extraReducers: (builder) => {
    // builder.addCase(fetchProducts.fulfilled, (state, action) => {
    //   state.products = action.payload;
    // });
>>>>>>> eb18683754f797b649e2be03c3067d2c3586e059
  },
});

// Action creators are generated for each case reducer function
<<<<<<< HEAD
export const { addBasket, edit } = products.actions;
=======
export const { addBasket } = products.actions;
>>>>>>> eb18683754f797b649e2be03c3067d2c3586e059

export default products.reducer;
