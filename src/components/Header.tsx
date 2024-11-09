import React from 'react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
const Header = () => {
  const session = useSession();
  console.log(session, 'ses');
  //! basket не приватил
  return (
    <>
      <header className="flex justify-center pt-4">
        <nav className="space-x-8">
          <Link className="cursor-pointer hover:opacity-50" href="/">
            Home
          </Link>
          <Link className="cursor-pointer hover:opacity-50" href="/products/page/1">
            Products
          </Link>
          {session?.data && (
            <Link className="cursor-pointer hover:opacity-50" href="/basket">
              Basket
            </Link>
          )}
          {session?.data && (
            <Link className="cursor-pointer hover:opacity-50" href="/profile">
              Profile
            </Link>
          )}
          {session?.data ? (
            <>
              <Link
                className="cursor-pointer hover:opacity-50"
                href="#"
                onClick={() => signOut({ callbackUrl: '/' })}>
                Log out
              </Link>

              <span className="opacity-70">Username - {session.data.user.name}</span>
            </>
          ) : (
            <Link className="cursor-pointer hover:opacity-50" href="/signin">
              Sign in
            </Link>
          )}
        </nav>
      </header>
    </>
  );
};

export default Header;
