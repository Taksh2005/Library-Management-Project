import { getPaginatedResourceIds, getResourceCount } from "./actions/serverActions";
import { ListViewCard } from "./components/ResourceCard";
import Link from "next/link";

export const revalidate = 10800; // 3 hours

const ITEMS_PER_PAGE = 30;

function PaginationControls({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const pageNumbers = [];
  const maxVisiblePages = 5;

  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex items-center justify-center space-x-2 mt-8">
      <Link
        href={`?page=${currentPage - 1}`}
        className={`px-3 py-2 rounded-md text-sm font-medium ${
          currentPage === 1
            ? "bg-gray-100 text-gray-400 cursor-not-allowed pointer-events-none"
            : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
        }`}
      >
        Previous
      </Link>

      {startPage > 1 && (
        <>
          <Link
            href="?page=1"
            className="px-3 py-2 rounded-md text-sm font-medium bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
          >
            1
          </Link>
          {startPage > 2 && <span className="px-2">...</span>}
        </>
      )}

      {pageNumbers.map((number) => (
        <Link
          key={number}
          href={`?page=${number}`}
          className={`px-3 py-2 rounded-md text-sm font-medium ${
            currentPage === number
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
          }`}
        >
          {number}
        </Link>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className="px-2">...</span>}
          <Link
            href={`?page=${totalPages}`}
            className="px-3 py-2 rounded-md text-sm font-medium bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
          >
            {totalPages}
          </Link>
        </>
      )}

      <Link
        href={`?page=${currentPage + 1}`}
        className={`px-3 py-2 rounded-md text-sm font-medium ${
          currentPage === totalPages
            ? "bg-gray-100 text-gray-400 cursor-not-allowed pointer-events-none"
            : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
        }`}
      >
        Next
      </Link>
    </div>
  );
}

function TopPaginationControls({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  return (
    <div className="flex items-center justify-end space-x-2 mb-4">
      <Link
        href={`?page=${currentPage - 1}`}
        className={`px-3 py-2 rounded-md text-sm font-medium ${
          currentPage === 1
            ? "bg-gray-100 text-gray-400 cursor-not-allowed pointer-events-none"
            : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
        }`}
      >
        Previous
      </Link>
      <Link
        href={`?page=${currentPage + 1}`}
        className={`px-3 py-2 rounded-md text-sm font-medium ${
          currentPage === totalPages
            ? "bg-gray-100 text-gray-400 cursor-not-allowed pointer-events-none"
            : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
        }`}
      >
        Next
      </Link>
    </div>
  );
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;

  // Run both queries in parallel
  const [resources, totalCount] = await Promise.all([
    getPaginatedResourceIds(currentPage, ITEMS_PER_PAGE),
    getResourceCount(),
  ]);

  const totalPages = Math.max(1, Math.ceil(totalCount / ITEMS_PER_PAGE));
  const validPage = Math.max(1, Math.min(currentPage, totalPages));

  return (
    <div className="w-full p-4 max-w-400">
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-gray-600">
          Page {validPage} of {totalPages}
        </div>
        {totalPages > 1 && (
          <TopPaginationControls
            currentPage={validPage}
            totalPages={totalPages}
          />
        )}
      </div>

      <ul
        role="list"
        className="grid lg:grid-cols-2 sm:grid-cols-1 xl:grid-cols-3"
      >
        {resources.map(({ id }) => (
          <ListViewCard key={id} resourceId={id} />
        ))}
      </ul>

      {totalPages > 1 && (
        <PaginationControls currentPage={validPage} totalPages={totalPages} />
      )}
    </div>
  );
}
