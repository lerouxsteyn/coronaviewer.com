import React from 'react';


export default ({ filters, handleFilterSortBy }) => {

  return (
    <div>
    	<select id="sortby" name="sortby" value={filters.sortby} onChange={handleFilterSortBy} className="mt-3 custom-control custom-select">
    		<option value="alphabetically">Sort alphabetically</option>
    		<option value="confirmed">Sort by confirmed cases</option>
    		<option value="active">Sort by active cases</option>
    		<option value="recovered">Sort by recoveries</option>
    		<option value="deaths">Sort by deaths</option>
    	</select>
    </div>
  );
}
