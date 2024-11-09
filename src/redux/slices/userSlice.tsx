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
import {
  fetchDeleteUserReq,
  fetchGetUserListReq,
  fetchPostUserRegistrationReq,
} from 'src/http/req/fetchUser';
import { createAsyncThunkWithReset } from './productSlice';

//<res,req>
export const fetchGetUserList = createAsyncThunkWithReset<UserI[], void>(
  'users/fetchGetUserList',
  async () => {
    return await fetchGetUserListReq();
  },
);
//! any
export const fetchPostUserRegistration = createAsyncThunkWithReset<
  UserI,
  { name: string; email: string; password: string }
>('users/fetchPostUserRegistration', async (data) => {
  return await fetchPostUserRegistrationReq(data);
});
export const fetchDeleteUser = createAsyncThunkWithReset<UserI, string>(
  'users/fetchDeleteUser',
  async (id) => {
    return await fetchDeleteUserReq(id);
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
    builder
      .addCase(fetchGetUserList.fulfilled, (state, action: PayloadAction<UserI[]>) => {
        state.userList = action.payload;
      })
      .addCase(fetchPostUserRegistration.fulfilled, (state, action: PayloadAction<UserI>) => {
        state.userList.push(action.payload);
      })
      .addCase(fetchDeleteUser.fulfilled, (state, action: PayloadAction<UserI>) => {
        state.userList = state.userList.filter((user) => user.id != action.payload.id);
      });
  },
});

// Action creators are generated for each case reducer function
export const {} = user.actions;

export default user.reducer;
