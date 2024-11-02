'use client';
import Link from 'next/link';
import React, { useEffect } from 'react';

const ProfileMain = ({ session }) => {
  useEffect(() => {
    // console.log(session, '----------------');
    const storedToken = localStorage.getItem('accessToken');
    if (!storedToken || storedToken !== session?.user?.accessToken) {
      localStorage.setItem('accessToken', session.user.accessToken);
    }
  }, []);
  return (
    <>
      <div>
        <h1>Profile of {session?.user?.name}</h1>
        {session?.user?.image && <img src={session.user.image} alt="" />}
      </div>
      {session?.user?.role === 'admin' ? (
        <div className="mt-4">
          <Link className="cursor-pointer hover:opacity-50 btn" href="profile/admin/editProduct/page/1">
            Создать/редактировать продукты
          </Link>
          {/* <div className="">Создать/редактировать продукты</div> */}
          <div className="btn">Повысить привилегию </div>
          <div className="btn">Статистика покупок </div>
          <div className="btn">Жалобы от пользователей </div>
        </div>
      ) : (
        <div className="mt-4">На большее прав не хватает</div>
      )}
    </>
  );
};

export default ProfileMain;
