import { Analytics } from '@vercel/analytics/react';
import 'design-system/public/tailwind-inject.css';
import { Provider } from 'jotai';
import { AppProps } from 'next/app';
import '../styles/scss/globals.scss';

function MyApp(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <Provider>
      <div id='portal' />
      <Component {...pageProps} />
      <Analytics />
    </Provider>
  );
}

export default MyApp;
