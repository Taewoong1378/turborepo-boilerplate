import { RecoilRoot } from 'recoil';
import { Analytics } from '@vercel/analytics/react';
import 'design-system/public/tailwind-inject.css';
import { AppProps } from 'next/app';
import '../styles/scss/globals.scss';

function MyApp(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <RecoilRoot>
      <div id='portal' />
      <Component {...pageProps} />
      <Analytics />
    </RecoilRoot>
  );
}

export default MyApp;
