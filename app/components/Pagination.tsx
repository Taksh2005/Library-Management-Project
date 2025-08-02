import React from "react";

type Props = {
  current: number;
  total: number;
  pageSize: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({ current, total, pageSize, onPageChange }: Props) {
  const totalPages = Math.ceil(total / pageSize);
  const visiblePages = Array.from({ length: totalPages }, (_, i) => i + 1).slice(
    Math.max(current - 2, 0),
    Math.min(current + 1, totalPages)
  );

  return (
    <div className="flex justify-center items-center gap-2 mt-6">
      <button
        onClick={() => onPageChange(current - 1)}
        disabled={current === 1}
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
      >
        Prev
      </button>

      {visiblePages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded ${
            current === page
              ? "bg-blue-600 text-white"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(current + 1)}
        disabled={current === totalPages}
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
