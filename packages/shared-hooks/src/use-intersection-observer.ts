import { useEffect, useRef } from 'react';

export const useIntersectionObserver = (
  callback: IntersectionObserverCallback,
  options: IntersectionObserverInit,
  targets: (Element | null)[],
) => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(callback, options);

    for (const target of targets) {
      if (target) observerRef.current?.observe(target);
    }

    return () => observerRef.current?.disconnect();
  }, [callback, options, targets]);
};
