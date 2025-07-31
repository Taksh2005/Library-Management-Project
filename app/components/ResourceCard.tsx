// app/components/ResourceCard.tsx (or wherever you keep server components)
import React from 'react';
import { prisma } from '@/lib/prisma';

interface Props {
  resourceId: number;
}

export default async function ResourceCard({ resourceId }: Props) {
  const resource = await prisma.resource.findUnique({
    where: { id: resourceId },
    include: {
      category: true,
      book: true,
      magazine: true,
      dvd: true,
      ebook: true,
    },
  });

  if (!resource) {
    return <div className="text-red-500">Resource not found</div>;
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-2xl p-6 w-full max-w-md border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-semibold mb-2">{resource.title}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Type: <span className="font-medium">{resource.resourceType}</span></p>
      {resource.publisher && (
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Publisher: {resource.publisher}</p>
      )}
      {resource.yearPublished && (
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Year: {resource.yearPublished}</p>
      )}
      {resource.category && (
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Category: {resource.category.name}</p>
      )}
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
        Copies: {resource.availableCopies} / {resource.totalCopies}
      </p>

      {resource.resourceType === 'Book' && resource.book && (
        <div className="mt-3">
          <p className="text-sm text-gray-700 dark:text-gray-200">Author: {resource.book.author}</p>
          <p className="text-sm text-gray-700 dark:text-gray-200">ISBN: {resource.book.isbn}</p>
        </div>
      )}

      {resource.resourceType === 'Magazine' && resource.magazine && (
        <div className="mt-3">
          <p className="text-sm text-gray-700 dark:text-gray-200">Issue: {resource.magazine.issueNumber}</p>
          <p className="text-sm text-gray-700 dark:text-gray-200">Month: {resource.magazine.month}</p>
        </div>
      )}

      {resource.resourceType === 'DVD' && resource.dvd && (
        <div className="mt-3">
          <p className="text-sm text-gray-700 dark:text-gray-200">Director: {resource.dvd.director}</p>
          <p className="text-sm text-gray-700 dark:text-gray-200">Duration: {resource.dvd.durationMin} mins</p>
        </div>
      )}

      {resource.resourceType === 'Ebook' && resource.ebook && (
        <div className="mt-3">
          <p className="text-sm text-gray-700 dark:text-gray-200">Format: {resource.ebook.format}</p>
          <a
            href={resource.ebook.fileUrl}
            className="text-blue-600 dark:text-blue-400 text-sm underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download Ebook
          </a>
        </div>
      )}
    </div>
  );
}
