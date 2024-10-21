import type { AuthOptions, User } from 'next-auth';
import GoggleProvider from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import axios from 'axios';
// import { users } from '@data/users';

export const authConfig: AuthOptions = {
  providers: [
    // GoggleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID!,
    //   clientSecret: process.env.GOOGLE_SECRET!,
    // }),
    Credentials({
      credentials: {
        email: { label: 'email', required: false },
        password: { label: 'password', required: false },
      },
      async authorize(credentials) {
        console.log('dfgfffffffffffffffffffff');

        if (!credentials?.email || !credentials.password) return null;
        try {
          const res = await axios.post(`http://localhost:3000/api/users/sign`, {
            email: credentials.email,
            password: credentials.password,
          });
          console.log(res,"--------------------");
          if (res.status === 200) {
            // const { token, id } = res.data;
            console.log(res.data.dto, 'res.data ------------------------------');
            return res.data.dto;
          }
        } catch (error) {
          console.log(error,"--------------------");
          
          throw new Error(error.response?.data?.message || 'Ошибка авторизации');
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: '/signin',
  },
  callbacks: {
    async jwt({ token, user }) {
      // console.log('token0000000', token);

      // Если пользователь авторизовался успешно, добавляем данные в токен
      if (user) {
        token.id = user.id;
        token.accessToken = user.token; // Пример добавления токена
        token.role = user.role; 
      }
      return token;
    },
    async session({ session, token }) {
      // Добавляем данные из токена в сессию
      session.user.id = token.id;
      session.user.accessToken = token.accessToken; // Пример добавления кастомного accessToken
      session.user.role = token.role; // Пример добавления кастомного accessToken
      return session;
    },
  },
};
