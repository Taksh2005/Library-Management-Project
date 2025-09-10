import React from 'react';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { getResourceById } from '../actions/serverActions';

interface Props {
  resourceId: number;
}

function getResourceImage(resourceType: string) {
  switch (resourceType) {
    case 'Book':
      return 'https://www.shutterstock.com/image-photo/blue-book-isolated-on-white-600nw-2179864007.jpg';
    case 'Magazine':
      return 'https://unblast.com/wp-content/uploads/2020/03/Top-View-Magazine-Mockup-1.jpg';
    case 'DVD':
      return 'https://www.shutterstock.com/image-vector/vector-3d-realistic-opened-cd-600nw-1824116351.jpg';
    case 'Ebook':
      return 'https://d34mvw1if3ud0g.cloudfront.net/65282/Amazon-Kindle--2024-_20250418-053045_full.jpeg';
    default:
      return '/images/default.png';
  }
}
export async function ListViewCard({ resourceId }: Props){
  const resource = await getResourceById(resourceId);
  if (!resource) {
    return <div className="text-red-500">Resource not found</div>;
  }

  const isAvailable = resource.availableCopies > 0;
  const imageSrc = getResourceImage(resource.resourceType);

  return(
    <Link href={"/resource/"+`${resourceId}`}>
      <li className="p-3 m-2 max-w-2xl sm:py-4 sm:max-w-full  bg-white border border-gray-200 rounded-lg shadow-sm sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <div className="flex items-center">
                    <div className="shrink-0">
                        <img className="w-25 h-25 rounded-xl" src={imageSrc} alt="Neil image"/>
                    </div>
                    <div className="flex-1 min-w-0 ms-4">
                        <p className="text-lg font-medium text-gray-900 truncate dark:text-white">
                            {resource.title}
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                            {resource.resourceType}
                        </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        <span
        className={`px-2 py-0.5 rounded-full text-xs font-medium ${
          isAvailable
            ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
            : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
        }`}
      >
        {isAvailable ? 'Available' : 'Unavailable'}
      </span>
                    </div>
                </div>
            </li>
    </Link>
  )
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

  const isAvailable = resource.availableCopies > 0;
  const imageSrc = getResourceImage(resource.resourceType);

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-3 w-full max-w-[180px] border border-gray-200 dark:border-gray-700 flex flex-col items-center space-y-2">
      <img
        src={imageSrc}
        alt={`${resource.resourceType} cover`}
        className="w-24 h-24 object-cover rounded"
      />

      <h2 className="text-sm font-semibold text-center text-gray-800 dark:text-white line-clamp-2">
        {resource.title}
      </h2>

      <span
        className={`px-2 py-0.5 rounded-full text-xs font-medium ${
          isAvailable
            ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
            : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
        }`}
      >
        {isAvailable ? 'Available' : 'Unavailable'}
      </span>
    </div>
  );
}
