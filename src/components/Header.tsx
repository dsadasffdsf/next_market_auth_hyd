import React from 'react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
const Header = () => {
  const session = useSession();
  console.log(session);

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
      </nav>
    </header>
  );
};

export default Header;
