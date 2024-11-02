'use client';
import { fetchGetUserList } from '@redux/slices/userSlice';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'src/hook/rtkHook';
import SingInUserInfo from './SingInUserInfo';

const SignInInformationList = () => {
  const dispatch = useAppDispatch();
  const userList = useAppSelector((state) => state.userSlice.userList);
  useEffect(() => {
    dispatch(fetchGetUserList());
  }, []);

  return (
    <div className="bg-slate-100 shadow-2xl p-4 ">
      <div className="text-center" onClick={() => dispatch(fetchGetUserList())}>
        Список активных пользователей
      </div>
      <ul className="space-y-1 bg-slate-400 py-1 ">
        {userList
          ? userList.map((item) => (
              <li className="bg-slate-100 py-2">
                <SingInUserInfo user={item} />
              </li>
            ))
          : ''}
      </ul>
    </div>
  );
};

export default SignInInformationList;
