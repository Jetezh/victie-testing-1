'use client'

import React, { useCallback, useEffect, useRef, useState } from "react";
import PageTransition from "@/components/PageTransition";
import { ProductCard } from "@/components/ProductCard";
import { ProductItem } from "@/types";

type FetchProducts = (page: number) => Promise<unknown>;

type PageTwoProps = {
  products?: ProductItem[];
  fetchData?: FetchProducts;
  loading?: boolean;
  error?: Error | null;
};

function PageTwo({
  products: controlledProducts,
  fetchData: controlledFetchData,
  loading: controlledLoading,
  error: controlledError,
}: PageTwoProps = {}) {
  const pageRef = useRef(1);
  const [localProducts, setLocalProducts] = useState<ProductItem[]>([]);
  const [localLoading, setLocalLoading] = useState(false);
  const [localError, setLocalError] = useState<Error | null>(null);

  const isControlled = typeof controlledFetchData === "function";

  const fetchProducts = useCallback(
    async (nextPage: number) => {
      if (isControlled && controlledFetchData) {
        await controlledFetchData(nextPage);
        return;
      }

      try {
        setLocalLoading(true);
        const res = await fetch(
          `https://dummyjson.com/products/?limit=10&skip=${(nextPage - 1) * 10}`
        );
        const data = await res.json();

        if (Array.isArray(data?.products)) {
          setLocalProducts((prev) =>
            nextPage === 1 ? data.products : [...prev, ...data.products]
          );
        }
      } catch (err) {
        if (err instanceof Error) {
          setLocalError(err);
        }
      } finally {
        setLocalLoading(false);
      }
    },
    [controlledFetchData, isControlled]
  );

  const handleScroll = useCallback(() => {
    const bottom =
      Math.ceil(window.innerHeight + window.scrollY) >=
      document.documentElement.scrollHeight - 200;
    if (bottom) {
      pageRef.current += 1;
      fetchProducts(pageRef.current);
    }
  }, [fetchProducts]);

  useEffect(() => {
    if (!isControlled) {
      fetchProducts(1);
      pageRef.current = 1;
    }
  }, [fetchProducts, isControlled]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const resolvedProducts = isControlled
    ? controlledProducts ?? []
    : localProducts;
  const resolvedLoading = isControlled
    ? controlledLoading ?? false
    : localLoading;
  const resolvedError = isControlled ? controlledError ?? null : localError;

  return (
    <PageTransition>
      <div>
        <div className="products-list">
          {resolvedProducts.map((product, index) => (
            <ProductCard product={product} key={index} />
          ))}
        </div>
        {resolvedLoading && <p>Loading...</p>}
        {resolvedError && <p>Error: {resolvedError.message}</p>}
      </div>
    </PageTransition>
  );
}

export default PageTwo
