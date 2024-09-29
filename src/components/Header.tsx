import React from 'react';
import Link from 'next/link';
<<<<<<< HEAD
import { signOut, useSession } from 'next-auth/react';
const Header = () => {
  const session = useSession();
  console.log(session);

=======
const Header = () => {
>>>>>>> eb18683754f797b649e2be03c3067d2c3586e059
  return (
    <header className="flex justify-center pt-4">
      <nav className="space-x-8">
        <Link className="cursor-pointer hover:opacity-50" href="/">
          Home
        </Link>
        <Link className="cursor-pointer hover:opacity-50" href="/products">
          Products
        </Link>
        <Link className="cursor-pointer hover:opacity-50" href="/basket">
          Basket
        </Link>
        <Link className="cursor-pointer hover:opacity-50" href="/auth">
          Auth
        </Link>
<<<<<<< HEAD
        {session?.data && (
          <Link className="cursor-pointer hover:opacity-50" href="/profile">
            Profile
          </Link>
        )}
        {session?.data ? (
          <Link
            className="cursor-pointer hover:opacity-50"
            href="#"
            onClick={() => signOut({ callbackUrl: '/' })}>
            Log out
          </Link>
        ) : (
          <Link className="cursor-pointer hover:opacity-50" href="/api/auth/signin">
            google sign in
          </Link>
        )}
=======
>>>>>>> eb18683754f797b649e2be03c3067d2c3586e059
      </nav>
    </header>
  );
};

export default Header;
