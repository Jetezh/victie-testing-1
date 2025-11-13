'use client'

/**
 * Contoh penggunaan InfiniteScrollWrapper untuk Desktop (Horizontal)
 * 
 * Untuk digunakan di recommendationComponentsDesktop.tsx
 */
import { InfiniteScrollWrapper } from './InfiniteScrollWrapper';
import { ProductCard } from './ProductCard';
import { ProductItem } from '@/types';
import { useState, useEffect } from 'react';

export function DesktopRecommendationExample() {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async (page: number) => {
    try {
      setLoading(true);
      // API endpoint: GET /api/for-you?page={page}
      const res = await fetch(`/api/for-you?page=${page}`, {
        credentials: 'include',
      });
      const data = await res.json();
      
      if (res.ok) {
        // Jika API mengembalikan array langsung
        if (Array.isArray(data)) {
          setProducts((prev) => [...prev, ...data]);
        } 
        // Jika API mengembalikan object dengan property data
        else if (data.data && Array.isArray(data.data)) {
          setProducts((prev) => [...prev, ...data.data]);
        }
        // Jika API mengembalikan object dengan property products
        else if (data.products && Array.isArray(data.products)) {
          setProducts((prev) => [...prev, ...data.products]);
        }
      } else {
        throw new Error(data.message || 'Failed to fetch data');
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err instanceof Error ? err : new Error('Unknown error'));
    }
  };

  return (
    <InfiniteScrollWrapper
      items={products}
      fetchData={fetchData}
      direction="horizontal"
      loading={loading}
      error={error}
      hasMore={true} // API unlimited, akan loop
      className="w-full h-[400px]"
    >
      {(items) => (
        <>
          {items.map((product) => (
            <div key={product.id} className="flex-shrink-0">
              <ProductCard product={product} />
            </div>
          ))}
        </>
      )}
    </InfiniteScrollWrapper>
  );
}

/**
 * Contoh penggunaan InfiniteScrollWrapper untuk Mobile (Vertical)
 * 
 * Untuk digunakan di recommendationComponents.tsx
 */
export function MobileRecommendationExample() {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async (page: number) => {
    try {
      setLoading(true);
      // API endpoint: GET /api/for-you?page={page}
      const res = await fetch(`/api/for-you?page=${page}`, {
        credentials: 'include',
      });
      const data = await res.json();
      
      if (res.ok) {
        // Jika API mengembalikan array langsung
        if (Array.isArray(data)) {
          setProducts((prev) => [...prev, ...data]);
        } 
        // Jika API mengembalikan object dengan property data
        else if (data.data && Array.isArray(data.data)) {
          setProducts((prev) => [...prev, ...data.data]);
        }
        // Jika API mengembalikan object dengan property products
        else if (data.products && Array.isArray(data.products)) {
          setProducts((prev) => [...prev, ...data.products]);
        }
      } else {
        throw new Error(data.message || 'Failed to fetch data');
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err instanceof Error ? err : new Error('Unknown error'));
    }
  };

  return (
    <InfiniteScrollWrapper
      items={products}
      fetchData={fetchData}
      direction="vertical"
      loading={loading}
      error={error}
      hasMore={true} // API unlimited, akan loop
      className="w-full h-screen"
    >
      {(items) => (
        <div className="flex flex-col gap-4">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </InfiniteScrollWrapper>
  );
}

