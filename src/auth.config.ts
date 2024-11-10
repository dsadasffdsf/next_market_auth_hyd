import axios from 'axios';
import type { NextAuthOptions } from 'next-auth';
import { getSession } from 'next-auth/react';

export const authConfig: NextAuthOptions = {
  pages: {
    signIn: '/signin',
  },
  providers: [], // Добавьте провайдеров позже
  callbacks: {
    //!+ мб тут лучше все редиректы сделать -

    async redirect({ url, baseUrl }) {
      // console.log('-----------------------redir');
      // Проверяем, куда редиректить
      const isLoggedIn = await getSession();
      const isOnDashboard = url.startsWith('/profile');

      if (isOnDashboard && !isLoggedIn) {
        return '/signin'; // Редирект на страницу входа
      } else if (isLoggedIn && !isOnDashboard) {
        return '/profile'; // Редирект на дашборд для залогиненных пользователей
      }
      return baseUrl; // По умолчанию редирект на базовый URL
    },
  },
};
