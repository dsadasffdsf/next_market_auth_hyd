export { default } from 'next-auth/middleware';

export const config = { matcher: ['/profile'] };

console.log('middleware is running');
