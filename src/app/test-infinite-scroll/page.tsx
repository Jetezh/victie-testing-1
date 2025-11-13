'use client'

import { InfiniteScrollWrapper } from '@/components/InfiniteScrollWrapper';
import { ProductCard } from '@/components/ProductCard';
import { ProductItem } from '@/types';
import { useState, useEffect } from 'react';

export default function TestInfiniteScrollPage() {
  // Mock data state untuk horizontal (Desktop)
  const [desktopProducts, setDesktopProducts] = useState<ProductItem[]>([]);
  const [desktopLoading, setDesktopLoading] = useState(false);
  const [desktopError, setDesktopError] = useState<Error | null>(null);

  // Mock data state untuk vertical (Mobile)
  const [mobileProducts, setMobileProducts] = useState<ProductItem[]>([]);
  const [mobileLoading, setMobileLoading] = useState(false);
  const [mobileError, setMobileError] = useState<Error | null>(null);

  // Mock fetch function untuk Desktop (Horizontal)
  const fetchDesktopData = async (page: number) => {
    try {
      setDesktopLoading(true);
      // Simulasi API call dengan mock data
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulasi delay
      
      // Mock data - dalam real implementation, ini akan hit GET /api/for-you?page={page}
      const mockData: ProductItem[] = Array.from({ length: 5 }, (_, i) => ({
        id: (page - 1) * 5 + i + 1,
        title: `Product ${(page - 1) * 5 + i + 1}`,
        description: `Description for product ${(page - 1) * 5 + i + 1}`,
        category: 'Electronics',
        price: 100 + i * 10,
        rating: 4.5,
        thumbnail: `https://picsum.photos/200/200?random=${(page - 1) * 5 + i + 1}`,
        brand: 'Brand X',
        discountPercentage: 10,
      }));

      setDesktopProducts((prev) => [...prev, ...mockData]);
      setDesktopLoading(false);
    } catch (err) {
      setDesktopLoading(false);
      setDesktopError(err instanceof Error ? err : new Error('Unknown error'));
    }
  };

  // Mock fetch function untuk Mobile (Vertical)
  const fetchMobileData = async (page: number) => {
    try {
      setMobileLoading(true);
      // Simulasi API call dengan mock data
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulasi delay
      
      // Mock data - dalam real implementation, ini akan hit GET /api/for-you?page={page}
      const mockData: ProductItem[] = Array.from({ length: 5 }, (_, i) => ({
        id: (page - 1) * 5 + i + 1,
        title: `Product ${(page - 1) * 5 + i + 1}`,
        description: `Description for product ${(page - 1) * 5 + i + 1}`,
        category: 'Electronics',
        price: 100 + i * 10,
        rating: 4.5,
        thumbnail: `https://picsum.photos/200/200?random=${(page - 1) * 5 + i + 1}`,
        brand: 'Brand X',
        discountPercentage: 10,
      }));

      setMobileProducts((prev) => [...prev, ...mockData]);
      setMobileLoading(false);
    } catch (err) {
      setMobileLoading(false);
      setMobileError(err instanceof Error ? err : new Error('Unknown error'));
    }
  };

  return (
    <div className="p-8 space-y-12">
      <h1 className="text-3xl font-bold mb-8">Infinite Scroll Test Page</h1>
      
      {/* Desktop Horizontal Scroll Example */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Desktop - Horizontal Scroll</h2>
        <div className="border-2 border-gray-300 rounded-lg p-4">
          <InfiniteScrollWrapper
            items={desktopProducts}
            fetchData={fetchDesktopData}
            direction="horizontal"
            loading={desktopLoading}
            error={desktopError}
            hasMore={true}
            className="w-full h-[400px]"
          >
            {(items) => (
              <>
                {items.map((product) => (
                  <div key={product.id} className="flex-shrink-0 w-[300px]">
                    <ProductCard product={product} />
                  </div>
                ))}
              </>
            )}
          </InfiniteScrollWrapper>
        </div>
      </section>

      {/* Mobile Vertical Scroll Example */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Mobile - Vertical Scroll</h2>
        <div className="border-2 border-gray-300 rounded-lg p-4">
          <InfiniteScrollWrapper
            items={mobileProducts}
            fetchData={fetchMobileData}
            direction="vertical"
            loading={mobileLoading}
            error={mobileError}
            hasMore={true}
            className="w-full h-[600px]"
          >
            {(items) => (
              <div className="flex flex-col gap-4">
                {items.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </InfiniteScrollWrapper>
        </div>
      </section>
    </div>
  );
}

