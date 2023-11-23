import { AppProps } from 'next/app';
import '../styles/scss/globals.scss';

function MyApp(props: AppProps) {
  const { Component, pageProps } = props;

  return <Component {...pageProps} />;
}

export default MyApp;
