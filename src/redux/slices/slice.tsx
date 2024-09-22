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
  },
  extraReducers: (builder) => {
    // builder.addCase(fetchProducts.fulfilled, (state, action) => {
    //   state.products = action.payload;
    // });
  },
});

// Action creators are generated for each case reducer function
export const { addBasket } = products.actions;

export default products.reducer;
