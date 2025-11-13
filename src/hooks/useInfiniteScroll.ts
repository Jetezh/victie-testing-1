'use client'

import { useEffect, useRef, useState, useCallback } from 'react';

interface UseInfiniteScrollOptions {
  fetchData: (page: number) => Promise<void>;
  direction: 'vertical' | 'horizontal';
  hasMore?: boolean;
  threshold?: number;
}

export const useInfiniteScroll = ({
  fetchData,
  direction,
  hasMore = true,
  threshold = 200,
}: UseInfiniteScrollOptions) => {
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const fetchDataRef = useRef(fetchData);
  const hasMoreRef = useRef(hasMore);
  const pageRef = useRef(1);
  const isLoadingRef = useRef(false);

  // Update refs when props change
  useEffect(() => {
    fetchDataRef.current = fetchData;
    hasMoreRef.current = hasMore;
  }, [fetchData, hasMore]);

  // Update refs when state changes
  useEffect(() => {
    pageRef.current = page;
    isLoadingRef.current = isLoading;
  }, [page, isLoading]);

  // Initial load
  useEffect(() => {
    fetchDataRef.current(1);
  }, []);

  const loadMore = useCallback(() => {
    if (!hasMoreRef.current || isLoadingRef.current) return;

    setIsLoading(true);
    const nextPage = pageRef.current + 1;
    setPage(nextPage);
    fetchDataRef.current(nextPage).finally(() => {
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const sentinel = sentinelRef.current;
    
    if (!container || !sentinel) return;

    const handleScroll = () => {
      if (isLoadingRef.current || !hasMoreRef.current) return;

      if (direction === 'vertical') {
        const { scrollTop, scrollHeight, clientHeight } = container;
        const distanceFromBottom = scrollHeight - scrollTop - clientHeight;

        if (distanceFromBottom < threshold) {
          loadMore();
        }
      } else {
        // Horizontal scrolling
        const { scrollLeft, scrollWidth, clientWidth } = container;
        const distanceFromRight = scrollWidth - scrollLeft - clientWidth;

        if (distanceFromRight < threshold) {
          loadMore();
        }
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });

    // Use Intersection Observer as primary method
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasMoreRef.current && !isLoadingRef.current) {
          loadMore();
        }
      },
      {
        root: container,
        rootMargin: direction === 'vertical' ? '0px 0px 200px 0px' : '0px 0px 0px 200px',
        threshold: 0.1,
      }
    );

    if (sentinel) {
      observerRef.current.observe(sentinel);
    }

    return () => {
      container.removeEventListener('scroll', handleScroll);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [direction, threshold, loadMore]);

  return {
    containerRef,
    sentinelRef,
    isLoading,
    page,
  };
};

