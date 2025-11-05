import React from 'react';
import BookDetails from '@/components/BookDetails';
import PageTransition from '@/components/PageTransition';
import { Link } from 'next-view-transitions';
import { books } from '@/data/books';

export default async function BookPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const bookId = parseInt(id);
  const book = books.find(b => b.id === bookId);

  if (!book) {
    return (
      <PageTransition>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Book Not Found</h1>
            <p className="text-gray-600">The book you&apos;re looking for doesn&apos;t exist.</p>
            <Link href="/" className="mt-4 inline-block px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
              Back to Home
            </Link>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="container flex flex-row mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
        <BookDetails data={book} />
      </div>
    </PageTransition>
  );
}
