import React from 'react';

export default ({ handleFilter, filters }) => {

  return (
    <div className="filter_align">
    	<label>
    		<input name="align" value="true" checked={filters.align} onChange={handleFilter} type="checkbox" className="mr-2" />
    		Align Day 1 for each country
    	</label>
    </div>
  );
}
