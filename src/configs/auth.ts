import type { AuthOptions, DefaultSession, User as NextAuthUser } from 'next-auth';
import GoggleProvider from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import axios from 'axios';
import { JWT } from 'next-auth/jwt';

// import { users } from '@data/users';
//! Додумать типизацию
// модернизация типизации session.user
declare module 'next-auth' {
  interface Session {
    user: {
      id: string; // Добавляем поле id
      role: string; // Добавляем поле role
      basket: string[];
      // Другие пользовательские поля, если есть
    } & DefaultSession['user']; // Сохраняем стандартные поля пользователя (name, email и т.д.)
  }
}

interface Dto {
  id: string;
  name: string;
  email: string;
  role: string;
  basket: string[];
}

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

      // Делаю запрос с сервера к api (authorize выполняется на сервере),чтобы получить объект с данными (это процесс входа)
      async authorize(credentials): Promise<Dto | null> {
        if (!credentials?.email || !credentials.password) return null;
        try {
          const res = await axios.post(`http://localhost:3000/api/users/sign`, {
            email: credentials.email,
            password: credentials.password,
          });
          // console.log(res, '--------------------');
          if (res.status === 200) {
            // const { token, id } = res.data;
            console.log(res.data.dto, 'res.data ------------------------------');
            const userData: Dto = res.data.dto;
            return userData;
          }
        } catch (error) {
          console.log(error, '--------------------');

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
    //! Разобраться с типизацией
    async jwt({ token, user }) {
      // console.log('token0000000', token);
      // console.log(user, '----------------user');
      // console.log(token, '----------------token');

      // Если пользователь авторизовался успешно, добавляем данные в токен
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = (user as Dto).role;
        // token.basket = (user as Dto).basket;
      }
      return token;
    },
    async session({ session, token }) {
      // Добавляем данные из токена в сессию
      session.user.id = token.id as string;
      session.user.email = token.email as string;
      session.user.role = token.role as string; 
      // session.user.basket = token.basket as string[]; 
      return session;
    },
  },
};
