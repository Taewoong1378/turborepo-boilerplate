import { Analytics } from '@vercel/analytics/react';
import 'design-system/public/tailwind-inject.css';
import type { AppProps } from 'next/app';
import '../styles/scss/globals.scss';

function MyApp(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <div id='portal' />
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}

export default MyApp;
