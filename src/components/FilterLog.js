import React from 'react';

export default ({ handleFilter, filters }) => {
	return (
		<div className="filter_align">
			<label className={filters.type !== 'confirmed' || filters.align === false ? 'disabled' : ''}>
				<input name="scale" value="true" disabled={filters.type !== 'confirmed'} checked={filters.scale === 'log'} onChange={handleFilter} type="checkbox" className="mr-2" />
				Logarithmic scale
			</label>
		</div>
	);
}
