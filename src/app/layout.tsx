'use client';

import React from 'react';
import '../styles/style.css';
import Header from '../components/Header';
import StoreProvider from '@redux/StoreProvider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <div className="container m-auto">
            <Header />
            <main className="mt-16">{children}</main>
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
