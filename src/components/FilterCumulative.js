import React from 'react';

export default ({ handleFilter, filters }) => {

  return (
      <div className="filter_align mr-3">
          <label>
              <input name="cumulative" value="true" disabled={filters.scale === 'log'} checked={filters.cumulative} onChange={handleFilter} type="checkbox" className="mr-1" />
              Cumulative
          </label>
      </div>
  );
}
