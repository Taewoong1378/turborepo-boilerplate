import { Suspense } from 'react';
import { ErrorBoundary, Header } from 'src/components';

export default function HomePage() {
  return (
    <ErrorBoundary>
      <Suspense>
        <Header />
      </Suspense>
    </ErrorBoundary>
  );
}
