import React from 'react';

export default ({ handleFilterType, filters }) => {

  return (
    <div id="filter_type">
    	<label>
    		<input name="type" value="confirmed" checked={filters.type === 'confirmed'} onChange={handleFilterType} type="radio" className="mr-2" />
    		Confirmed
    	</label>
    	<label>
    		<input name="type" value="active" checked={filters.type === 'active'} onChange={handleFilterType} type="radio" className="mr-2" />
    		Active
    	</label>
    	<label>
    		<input name="type" value="recovered" checked={filters.type === 'recovered'} onChange={handleFilterType} type="radio" className="mr-2" />
    		Recoveries
    	</label>
    	<label>
    		<input name="type" value="deaths" checked={filters.type === 'deaths'} onChange={handleFilterType} type="radio" className="mr-2" />
    		Deaths
    	</label>
    </div>
  );
}
