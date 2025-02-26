import React from "react";

const Search = ({
  search,
  setSearch,
  filters,
}: {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  filters: string[];
}) => {
  return (
    <div className="mb-12 w-full">
      <div className="relative w-[90%] sm:w-[80%] md:w-[60%] lg:w-[50%]">
        <input
          type="text"
          placeholder={`Search ${filters[0]} by ${filters[1]}...`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 pr-10 rounded-md bg-gray-200 outline-slate-900"
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 bg-slate-900 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

export default Search;
