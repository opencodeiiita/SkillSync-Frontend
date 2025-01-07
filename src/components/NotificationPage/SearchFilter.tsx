import React from 'react';

interface SearchFilterProps {
  setSearchTerm: (term: string) => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({ setSearchTerm }) => {
  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search notifications..."
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default SearchFilter;

