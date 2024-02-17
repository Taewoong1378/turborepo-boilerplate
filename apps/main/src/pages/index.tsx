import { Suspense } from 'react';
import { ErrorBoundary } from '@shared/components';
import { Header } from 'src/components';

export default function HomePage() {
  return (
    <ErrorBoundary>
      <Suspense>
        <Header />
      </Suspense>
    </ErrorBoundary>
  );
}
