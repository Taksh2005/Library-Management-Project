import React from "react";

type SortOptions = "createdAt" | "title" | "bookmarkCount";
type SortOrder = "asc" | "desc";

type Props = {
  sort: { by: SortOptions; order: SortOrder };
  setSort: (s: { by: SortOptions; order: SortOrder }) => void;
};

export default function SortControl({ sort, setSort }: Props) {
  const handleSortByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort({ ...sort, by: e.target.value as SortOptions });
  };

  const toggleOrder = () => {
    setSort({
      ...sort,
      order: sort.order === "asc" ? "desc" : "asc",
    });
  };

  return (
    <div className="flex items-center gap-4 mb-4">
      <label className="font-medium">Sort by:</label>
      <select
        value={sort.by}
        onChange={handleSortByChange}
        className="border px-2 py-1 rounded"
      >
        <option value="createdAt">Time Added</option>
        <option value="title">Title (A-Z)</option>
        <option value="bookmarkCount">Most Bookmarked</option>
      </select>

      <button
        onClick={toggleOrder}
        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
        title="Toggle Asc/Desc"
      >
        {sort.order === "asc" ? "↑ Asc" : "↓ Desc"}
      </button>
    </div>
  );
}
