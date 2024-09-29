'use client';

import React from 'react';
import '../styles/style.css';
import Header from '../components/Header';
import { Providers } from '@components/Providers';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="container m-auto">
            <Header />
            <main className="mt-16">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
