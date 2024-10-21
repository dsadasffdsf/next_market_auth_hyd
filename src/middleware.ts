import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  // Получаем токен с помощью next-auth для проверки авторизации и ролей
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET || 'secret' });

  // Проверяем, авторизован ли пользователь
  if (!token) {
    return NextResponse.redirect(new URL('/signin', req.url)); // Если не авторизован, перенаправляем на страницу входа
  }

  const { pathname } = req.nextUrl;

  // Проверка для доступа к маршрутам админа
  if (pathname.startsWith('/profile/admin')) {
    // Если роль пользователя не "admin", редирект на страницу запрета
    if (token.role !== 'admin') {
      return NextResponse.redirect(new URL('/profile', req.url));
    }
  }

  // Проверка для доступа к маршрутам пользователя
  if (pathname.startsWith('/profile/user')) {
    // Если роль пользователя не "user", редирект на страницу запрета
    if (token.role !== 'user') {
      return NextResponse.redirect(new URL('/profile', req.url));
    }
  }

  // Если все проверки пройдены, продолжаем выполнение запроса
  return NextResponse.next();
}

// Применение middleware для маршрутов /profile/admin и /profile/user
export const config = { matcher: ['/profile/admin/:path*', '/profile/user/:path*'] };

console.log('middleware is running');
