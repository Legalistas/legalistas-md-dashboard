import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

const SearchInput = ({ globalFilter, setGlobalFilter, isLoading }) => {
  return (
    <div className="relative w-1/2">
      <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
        <FaMagnifyingGlass />
      </div>
      <input
        type="search"
        id="default-search"
        className="text-gray-900 border-gray-300 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 text-md block w-full rounded-lg border p-2 ps-10 focus:border-blue-500 focus:ring-blue-500 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
        placeholder="Search Mockups, Logos..."
        value={globalFilter || ""}
        onChange={(e) => setGlobalFilter(e.target.value)}
      />
      {isLoading && (
        <div className="absolute right-0 top-0 p-2">
          <svg
            className="text-gray-900 h-5 w-5 animate-spin dark:text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.96 7.96 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export default SearchInput;
