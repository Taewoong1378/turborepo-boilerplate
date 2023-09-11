import { useRef } from 'react';
import { RecoilRoot } from 'recoil';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Analytics } from '@vercel/analytics/react';
import 'design-system/public/tailwind-inject.css';
import { AppProps } from 'next/app';

import '../styles/scss/globals.scss';

const DEFAULT_STALE_TIME = 10 * 60 * 1000;
const DEFAULT_CACHE_TIME = 10 * 60 * 1000;

function MyApp(props: AppProps) {
  const queryClientRef = useRef<QueryClient>();

  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: DEFAULT_STALE_TIME,
          cacheTime: DEFAULT_CACHE_TIME,
        },
      },
    });
  }

  const { Component, pageProps } = props;

  return (
    <QueryClientProvider client={queryClientRef.current}>
      <RecoilRoot>
        <div id='portal'></div>
        <Component {...pageProps} />
        <Analytics />
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default MyApp;
