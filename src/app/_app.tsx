import type { AppProps } from 'next/app';
import React from 'react';
import '../styles/style.css';
import { Provider } from 'react-redux';
import { store } from '@redux/store';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
