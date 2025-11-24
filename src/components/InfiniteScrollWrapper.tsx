'use client'

import { ReactNode, useState, useEffect } from 'react';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

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

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const isCurrentlyLoading = loading || isLoading;

  // Update scroll button states for horizontal direction
  useEffect(() => {
    if (direction !== 'horizontal') return;

    const container = containerRef.current;
    if (!container) return;

    const updateScrollButtons = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    };

    // Initial check
    updateScrollButtons();

    // Update on scroll
    container.addEventListener('scroll', updateScrollButtons, { passive: true });

    // Update on resize
    const resizeObserver = new ResizeObserver(updateScrollButtons);
    resizeObserver.observe(container);

    return () => {
      container.removeEventListener('scroll', updateScrollButtons);
      resizeObserver.disconnect();
    };
  }, [direction, items]);

  const scrollLeft = () => {
    const container = containerRef.current;
    if (!container) return;
    container.scrollBy({ left: -container.clientWidth * 0.8, behavior: 'smooth' });
  };

  const scrollRight = () => {
    const container = containerRef.current;
    if (!container) return;
    container.scrollBy({ left: container.clientWidth * 0.8, behavior: 'smooth' });
  };

  return (
    <div className={`relative ${direction === 'horizontal' ? 'w-full' : ''}`}>
      {/* Previous button - only for horizontal */}
      {direction === 'horizontal' && canScrollLeft && (
        <button
          onClick={scrollLeft}
          className="absolute left-5 hover:left-3 top-1/2 -translate-y-1/2 z-10 bg-[#DD7B8D]/90 hover:bg-[#DD7B8D] shadow-lg rounded-full p-2 transition-all duration-300 hover:cursor-pointer"
          aria-label="Scroll left"
        >
          <FaChevronLeft className="w-6 h-6 text-gray-900 dark:text-gray-200" />
        </button>
      )}

      {/* Next button - only for horizontal */}
      {direction === 'horizontal' && canScrollRight && (
        <button
          onClick={scrollRight}
          className="absolute right-5 hover:right-3 top-1/2 -translate-y-1/2 z-10 bg-[#DD7B8D]/90 hover:bg-[#DD7B8D] shadow-lg rounded-full p-2 transition-all duration-300 hover:cursor-pointer"
          aria-label="Scroll right"
        >
          <FaChevronRight className="w-6 h-6 text-gray-900 dark:text-gray-200" />
        </button>
      )}

      <div
        ref={containerRef}
        className={`infinite-scroll-container ${
          direction === 'horizontal'
            ? 'overflow-x-auto overflow-y-hidden flex flex-row scroll-smooth'
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
    </div>
  );
}

