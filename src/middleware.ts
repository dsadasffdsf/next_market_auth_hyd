import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// const hasAccess = (role: string, allowedRoles: string[]) => {
//   return allowedRoles.includes(role);
// };


export async function middleware(req: NextRequest) {
  // Получаем токен для проверки авторизации и ролей
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET || 'secret' });
  // console.log(token,"token------------------------");
  
  // Проверяем, авторизован ли пользователь
  if (!token) {
    return NextResponse.redirect(new URL('/signin', req.url));
  }

  const { pathname } = req.nextUrl;

  // for (const [route, allowedRoles] of Object.entries(routes)) {
  //   if (pathname.startsWith(route) && !hasAccess(token.role, allowedRoles)) {
  //     return NextResponse.redirect(new URL('/profile', req.url)); // Редирект на страницу с ошибкой
  //   }
  // }



  // Проверка доступа к маршруту админа
  if (pathname.startsWith('/profile/admin') && token.role !== 'admin') {
    return NextResponse.redirect(new URL('/profile', req.url));
  }

  // Проверка доступа к маршруту пользователя
  if (pathname.startsWith('/profile/user') && token.role !== 'user') {
    return NextResponse.redirect(new URL('/profile', req.url));
  }

  // Если все проверки пройдены, продолжаем выполнение запроса
  return NextResponse.next();
}

// Применение middleware для маршрутов
export const config = { matcher: ['/profile/admin/:path*', '/profile/user/:path*'] };

console.log('middleware is running');