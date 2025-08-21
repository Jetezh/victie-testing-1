'use client'

import BookCard from "@/components/BookCard";
import { Link } from "next-view-transitions";
import { books } from "@/data/books";

export default function Home() {

  return (
    <div>
      <div className="flex flex-row gap-5">
        {books.map((book) => (
          <Link key={book.id} href={`/books/${book.id}`}>
            <BookCard data={book} />
          </Link>
        ))}
      </div>
    </div>
  );
}
