import React from 'react';
import { Outlet } from 'react-router-dom';

function SearchPage() {
  return (
    <div>
      <h1>Search Page</h1>
      <Outlet />
    </div>
  );
}

export default SearchPage;
