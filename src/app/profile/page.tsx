import { authConfig } from '@configs/auth';

import { getServerSession } from 'next-auth';
import Link from 'next/link';
import React from 'react';

export default async function Page() {
  const session = await getServerSession(authConfig);
  console.log(session);
  // картинка не появляется при первом рендере
  return (
    <>
      <div>
        <h1>Profile of {session?.user?.name}</h1>
        {session?.user?.image && <img src={session.user.image} alt="" />}
      </div>
      <div className="mt-4">
        <Link className="cursor-pointer hover:opacity-50 btn" href="profile/admin/editProduct">
          Создать/редактировать продукты
        </Link>
        {/* <div className="">Создать/редактировать продукты</div> */}
        <div className="btn">Повысить привилегию </div>
        <div className="btn">Статистика покупок </div>
        <div className="btn">Жалобы от пользователей </div>
      </div>
    </>
  );
}
