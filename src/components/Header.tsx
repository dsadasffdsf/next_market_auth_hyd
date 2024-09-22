import React from 'react';
import Link from 'next/link';
const Header = () => {
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
      </nav>
    </header>
  );
};

export default Header;
