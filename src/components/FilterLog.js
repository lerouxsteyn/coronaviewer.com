import React from 'react';

export default ({ handleFilter, filters, numCountries }) => {
	return (
		<div className="filter_align">
			<label className={filters.type !== 'confirmed' || numCountries === 0 || filters.align === false ? 'disabled' : ''}>
				<input name="scale" value="true" disabled={filters.type !== 'confirmed' || numCountries === 0} checked={filters.scale === 'log'} onChange={handleFilter} type="checkbox" className="mr-2" />
				Logarithmic scale
			</label>
		</div>
	);
}
