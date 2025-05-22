import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ search, setSearch, handleSearch }) => (
  <form onSubmit={handleSearch} className="flex items-center w-1/2 max-w-lg">
    <div className="flex items-center border border-gray-300 rounded overflow-hidden bg-white w-full">
      <span className="px-3 text-gray-500">
        <FaSearch />
      </span>
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full py-2 px-2 focus:outline-none"
      />
    </div>
  </form>
);

export default SearchBar;
