'use client';

import React from 'react';
import '../styles/style.css';
import Header from '../components/Header';
<<<<<<< HEAD
import { Providers } from '@components/Providers';
=======
import StoreProvider from '@redux/StoreProvider';
>>>>>>> eb18683754f797b649e2be03c3067d2c3586e059

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
<<<<<<< HEAD
        <Providers>
=======
        <StoreProvider>
>>>>>>> eb18683754f797b649e2be03c3067d2c3586e059
          <div className="container m-auto">
            <Header />
            <main className="mt-16">{children}</main>
          </div>
<<<<<<< HEAD
        </Providers>
=======
        </StoreProvider>
>>>>>>> eb18683754f797b649e2be03c3067d2c3586e059
      </body>
    </html>
  );
}
