import GenreSelectionDialog from "@/components/GenreSelectionDialog";
import Navbar from "@/components/Navbar";
import BookCard from "@/components/BookCard";
import PageTransition from "@/components/PageTransition";
import { books } from "@/data/books";
import { Link } from "next-view-transitions";

export default function Page() {
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
        </main>
      </PageTransition>
    </>
  );
}