import React from 'react';

export default ({ handleFilter, filters }) => {

  return (
    <div className="filter_align">
        <label>
            <input name="align" value="case_100" checked={filters.align === 'case_100'} onChange={handleFilter} type="radio" className="mr-1" />
            From 100th case
        </label>

        <label className="ml-2">
            <input name="align" value="day_1" checked={filters.align === 'day_1'} onChange={handleFilter} type="radio" className="mr-1" />
            From Day 1
        </label>
        <label className="ml-2">
            <input name="align" value="date" checked={filters.align === 'date'} onChange={handleFilter} type="radio" className="mr-1" />
            By Date
        </label>
    </div>
  );
}
