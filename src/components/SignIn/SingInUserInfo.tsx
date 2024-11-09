'use client';
import { UserI } from '@interfaces/ProductI';
import { fetchDeleteUser } from '@redux/slices/userSlice';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useAppDispatch } from 'src/hook/rtkHook';

const SingInUserInfo = ({ user }: { user: UserI }) => {
  const { id, email, password, role } = user;

  const session = useSession();
  const dispatch = useAppDispatch();
  console.log(session, 'session-------');
  const pathname = usePathname();
  const deleteHandler = () => {
    dispatch(fetchDeleteUser(id));
  };
  return (
    <div className="flex justify-between">
      <div>
        <div>Email- {email}</div>
        <div>Password- {password}</div>
        <div>Role- {role}</div>
      </div>
      {session?.data?.user?.role === 'admin' && pathname === '/profile' && (
        <div className="self-center">
          <button
            className=" ml-4 p-2 bg-red-500 justify-self-end py-2 px-4 text-white rounded-2xl hover:opacity-70"
            onClick={deleteHandler}>
            Удалить
          </button>
        </div>
      )}
    </div>
  );
};

export default SingInUserInfo;
