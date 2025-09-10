// components/FilterComponent.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface FilterOption {
  value: string;
  label: string;
}

interface FilterComponentProps {
  filterOptions: {
    types: FilterOption[];
    years: FilterOption[];
    publishers: FilterOption[];
    categories: FilterOption[];
  };
}

export default function FilterComponent({ filterOptions }: FilterComponentProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedFilters, setSelectedFilters] = useState({
    type: [] as string[],
    year: [] as string[],
    publisher: [] as string[],
    category: [] as string[],
  });
  const [sortField, setSortField] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  // Initialize filters from URL params
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    
    setSelectedFilters({
      type: params.getAll("type"),
      year: params.getAll("year"),
      publisher: params.getAll("publisher"),
      category: params.getAll("category"),
    });
    
    if (params.get("sortField")) {
      setSortField(params.get("sortField")!);
    }
    
    if (params.get("sortOrder")) {
      setSortOrder(params.get("sortOrder")!);
    }
  }, [searchParams]);

  const handleFilterChange = (filterType: string, value: string) => {
    setSelectedFilters(prev => {
      const currentValues = prev[filterType as keyof typeof prev];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      
      return { ...prev, [filterType]: newValues };
    });
  };

  const applyFilters = () => {
    const params = new URLSearchParams();
    
    // Add filter params
    Object.entries(selectedFilters).forEach(([key, values]) => {
      values.forEach(value => params.append(key, value));
    });
    
    // Add sort params
    params.set("sortField", sortField);
    params.set("sortOrder", sortOrder);
    
    // Reset to page 1 when filters change
    params.set("page", "1");
    
    router.push(`?${params.toString()}`);
  };

  const clearFilters = () => {
    setSelectedFilters({
      type: [],
      year: [],
      publisher: [],
      category: [],
    });
    setSortField("createdAt");
    setSortOrder("desc");
    router.push("?page=1");
  };

  const FilterSection = ({ title, options, filterType }: {
    title: string;
    options: FilterOption[];
    filterType: keyof typeof selectedFilters;
  }) => (
    <div className="mb-6">
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <div className="space-y-2">
        {options.map(option => (
          <label key={option.value} className="flex items-center">
            <input
              type="checkbox"
              checked={selectedFilters[filterType].includes(option.value)}
              onChange={() => handleFilterChange(filterType, option.value)}
              className="mr-2"
            />
            {option.label}
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-gray-700 p-6 rounded-lg shadow-md mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <FilterSection title="Resource Types" options={filterOptions.types} filterType="type" />
        <FilterSection title="Years" options={filterOptions.years} filterType="year" />
        <FilterSection title="Publishers" options={filterOptions.publishers} filterType="publisher" />
        <FilterSection title="Categories" options={filterOptions.categories} filterType="category" />
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-medium mb-2">Sorting</h3>
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Sort By</label>
            <select
              value={sortField}
              onChange={(e) => setSortField(e.target.value)}
              className="border rounded px-3 py-2"
            >
              <option value="createdAt">Date Added</option>
              <option value="yearPublished">Publication Year</option>
              <option value="title">Title</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Order</label>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="border rounded px-3 py-2"
            >
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end space-x-4">
        <button
          onClick={clearFilters}
          className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Clear Filters
        </button>
        <button
          onClick={applyFilters}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}