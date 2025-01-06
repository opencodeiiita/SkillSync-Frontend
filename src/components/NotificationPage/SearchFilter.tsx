import React from 'react';
import  NotificationPage from '../../styles/NotificationPage.css'
interface SearchFilterProps {
  setSearchTerm: (term: string) => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({ setSearchTerm }) => {
  return (
    <div className="search-filter">
      <input 
        type="text" 
        placeholder="Search notifications..." 
        onChange={(e) => setSearchTerm(e.target.value)} 
      />
    </div>
  );
};

export default SearchFilter;