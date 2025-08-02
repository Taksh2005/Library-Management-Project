import React from "react";

type FilterProps = {
  filters: {
    types: string[];
    years: number[];
    categories: number[];
  };
  categoriesList: { id: number; name: string }[]; // from API
  onChange: (newFilters: FilterProps["filters"]) => void;
};

const resourceTypes = ["Book", "Magazine", "DVD", "Ebook"];

export default function FilterPanel({ filters, categoriesList, onChange }: FilterProps) {
  const toggle = (field: keyof typeof filters, value: string | number) => {
    const current = filters[field] as any[];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];

    onChange({ ...filters, [field]: updated });
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-900 rounded-xl shadow-md grid gap-4 md:grid-cols-3">
      {/* Type Filter */}
      <div>
        <h3 className="font-semibold mb-2">Type</h3>
        <div className="flex flex-wrap gap-2">
          {resourceTypes.map((type) => (
            <label key={type} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={filters.types.includes(type)}
                onChange={() => toggle("types", type)}
              />
              {type}
            </label>
          ))}
        </div>
      </div>

      {/* Year Filter */}
      <div>
        <h3 className="font-semibold mb-2">Year Published</h3>
        <input
          type="number"
          placeholder="Add year (e.g. 2023)"
          className="border p-1 rounded"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              const val = parseInt((e.target as HTMLInputElement).value);
              if (!isNaN(val)) toggle("years", val);
              (e.target as HTMLInputElement).value = "";
            }
          }}
        />
        <div className="mt-2 flex gap-2 flex-wrap">
          {filters.years.map((year) => (
            <span
              key={year}
              className="bg-gray-200 px-2 py-1 rounded cursor-pointer"
              onClick={() => toggle("years", year)}
            >
              {year} ✕
            </span>
          ))}
        </div>
      </div>

      {/* Category Filter */}
      <div>
        <h3 className="font-semibold mb-2">Category</h3>
        <div className="flex flex-wrap gap-2">
          {categoriesList.map((cat) => (
            <label key={cat.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={filters.categories.includes(cat.id)}
                onChange={() => toggle("categories", cat.id)}
              />
              {cat.name}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
