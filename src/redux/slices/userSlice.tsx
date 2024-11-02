import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { InitialProduct, InitialUser, ProductI, UserI } from '@interfaces/ProductI';

import { getToken } from 'next-auth/jwt';
import Cookies from 'js-cookie';
import { apiRequest } from 'src/http/apiReq';
import { fetchGetUserListReq } from 'src/http/req/fetchUser';

//<res,req>
export const fetchGetUserList = createAsyncThunk<UserI[], void>(
  'users/fetchGetUserList',
  async () => {
    return await fetchGetUserListReq();
  },
);

const initialState: InitialUser = {
  userList: [],
  error: null,
};

export const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // edit: (state, action: PayloadAction<ProductI>) => {
    //   state.editProduct = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGetUserList.fulfilled, (state, action: PayloadAction<UserI[]>) => {
      state.userList = action.payload;
    });
  },
});

// Action creators are generated for each case reducer function
export const {} = user.actions;

export default user.reducer;
