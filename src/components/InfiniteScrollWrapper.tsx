'use client'

import { ReactNode } from 'react';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';

interface InfiniteScrollWrapperProps<T> {
  items: T[];
  fetchData: (page: number) => Promise<void>;
  direction: 'vertical' | 'horizontal';
  loading?: boolean;
  error?: Error | null;
  hasMore?: boolean;
  children: (items: T[]) => ReactNode;
  className?: string;
  loadingComponent?: ReactNode;
  errorComponent?: ReactNode;
}

export function InfiniteScrollWrapper<T>({
  items,
  fetchData,
  direction,
  loading = false,
  error = null,
  hasMore = true,
  children,
  className = '',
  loadingComponent,
  errorComponent,
}: InfiniteScrollWrapperProps<T>) {
  const { containerRef, sentinelRef, isLoading } = useInfiniteScroll({
    fetchData,
    direction,
    hasMore,
  });

  const isCurrentlyLoading = loading || isLoading;

  return (
    <div
      ref={containerRef}
      className={`infinite-scroll-container ${
        direction === 'horizontal'
          ? 'overflow-x-auto overflow-y-hidden flex flex-row'
          : 'overflow-y-auto overflow-x-hidden'
      } ${className}`}
    >
      {children(items)}
      
      {/* Sentinel element for intersection observer */}
      <div
        ref={sentinelRef}
        className={direction === 'horizontal' ? 'flex-shrink-0' : ''}
        style={{
          ...(direction === 'horizontal'
            ? { minWidth: '1px', height: '100%' }
            : { minHeight: '1px', width: '100%' }),
        }}
      />

      {/* Loading indicator */}
      {isCurrentlyLoading && (
        <div
          className={`loading-indicator ${
            direction === 'horizontal'
              ? 'flex items-center justify-center min-w-[200px] flex-shrink-0'
              : 'w-full py-4 text-center'
          }`}
        >
          {loadingComponent || <p>Loading...</p>}
        </div>
      )}

      {/* Error indicator */}
      {error && (
        <div
          className={`error-indicator ${
            direction === 'horizontal'
              ? 'flex items-center justify-center min-w-[200px] flex-shrink-0'
              : 'w-full py-4 text-center'
          }`}
        >
          {errorComponent || <p>Error: {error.message}</p>}
        </div>
      )}
    </div>
  );
}

