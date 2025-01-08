import React, { useState } from 'react';
import SearchResults from './SearchResults';
import { config } from '../service/api';
import { Icon } from "@iconify/react";
import { BASE_URL } from '../service/config';
const SearchBar = ({ handleSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = event => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    handleSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center bg-gray-100 p-2 px-3 rounded-md">
        <input
          placeholder="Site Search"
          className="bg-transparent outline-none"
          value={searchTerm}
          onChange={handleChange}
        />
        <button type="submit">
          <Icon
            className="h-[1.5rem] w-auto text-primary"
            icon="ic:outline-search"
          />
        </button>
      </div>
    </form>
  );
};

const Search = () => {
  const [searchResults, setSearchResults] = useState(null);

  const handleSearch = async searchTerm => {
    try {
      // request data dari API dengan query parameter searchTerm
      const response = await fetch(BASE_URL+`Api/AthleteProfile/GetList?Name=${searchTerm}`, {
        headers: await config()
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch search results");
      }
  
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error(error);
    }
  };  

  return (
    <div>
      <SearchBar handleSearch={handleSearch} />
      {searchResults && <SearchResults data={searchResults} />}
    </div>
  );
};

export default Search;
