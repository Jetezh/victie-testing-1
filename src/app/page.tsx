'use client'

import GenreSelectionDialog from "@/components/GenreSelectionDialog";
import Navbar from "@/components/Navbar";
import BookCard from "@/components/BookCard";
import PageTransition from "@/components/PageTransition";
import { books } from "@/data/books";
import { Link } from "next-view-transitions";
import { useEffect, useState } from "react";
import { ProductItem } from "@/types";
// import { FromScratch } from "@/app/scroll/FromScracth";
import { WithReactScroll } from "@/app/scroll/WithReactScroll";

export default function Page() {

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [error, setError] = useState<null|Error>(null);

  const fetchData = async (page: number) => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://dummyjson.com/products/?limit=10&skip=${(page - 1) * 5}`
      );
      const data = await res.json();
      if (res.ok) {
        setProducts((prevItems) => [...prevItems, ...data.products]);
        if (page === 1) {
          setTotalProducts(() => data.total); // only set this once
        }
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error instanceof Error) {
        setError(error);
      }
    }
  };

  useEffect(() => {
    let subscribed = true;
    (async () => {
      if (subscribed) {
        await fetchData(1);
      }
    })();
  
    return () => {
      subscribed = false;
    };
  }, []);
  
  return (
    <>
      <GenreSelectionDialog />
      <Navbar />
      <PageTransition>
        <main>
          <div className="flex flex-row gap-5">
            {books.map((book) => (
              <Link key={book.id} href={`/books/${book.id}`}>
                <BookCard data={book} />
              </Link>
            ))}
          </div>
          <WithReactScroll
            products={products}
            fetchData={fetchData}
            totalProducts={totalProducts}
          />
        </main>
      </PageTransition>
    </>
  );
}