import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// const hasAccess = (role: string, allowedRoles: string[]) => {
//   return allowedRoles.includes(role);
// };

export async function middleware(req: NextRequest) {
  // Получаем токен для проверки авторизации и ролей
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET || 'secret' });
  const { pathname } = req.nextUrl;

  if (pathname.startsWith('/profile') && !token) {
    return NextResponse.redirect(new URL('/signin', req.url));
  }

  // Проверка доступа к маршруту админа
  if (pathname.startsWith('/profile/admin') && token.role !== 'admin') {
    return NextResponse.redirect(new URL('/profile', req.url));
  }

  // Если все проверки пройдены, продолжаем выполнение запроса
  return NextResponse.next();
}

// Применение middleware для маршрутов
export const config = {
  matcher: ['/profile/admin/:path*', '/profile/user/:path*', '/profile/:path*'],
};

console.log('middleware is running');
