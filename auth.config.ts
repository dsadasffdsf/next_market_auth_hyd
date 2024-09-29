import type { NextAuthOptions } from 'next-auth';
import { getSession } from 'next-auth/react';

export const authConfig: NextAuthOptions = {
  pages: {
    signIn: '/login',
  },
  providers: [], // Добавьте провайдеров позже
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // Логика для проверки, можно ли пользователю войти
      return true; // или false в зависимости от проверки
    },
    async redirect({ url, baseUrl }) {
      // Проверяем, куда редиректить
      const isLoggedIn = !!(await getSession());
      const isOnDashboard = url.startsWith('/dashboard');

      if (isOnDashboard && !isLoggedIn) {
        return '/login'; // Редирект на страницу входа
      } else if (isLoggedIn && !isOnDashboard) {
        return '/dashboard'; // Редирект на дашборд для залогиненных пользователей
      }
      return baseUrl; // По умолчанию редирект на базовый URL
    },
  },
};
