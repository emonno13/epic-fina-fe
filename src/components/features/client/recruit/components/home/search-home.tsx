import React from 'react';
import SearchForm from '../search/search-form';

import './search-home.scss';

const SearchHome = React.memo(()=> {
  return (
    <div className="search-home__search-container">
      <div className="search-home__search">
        <SearchForm onClick={()=> {}}/>
      </div>
    </div>
  );
});
export default SearchHome;
