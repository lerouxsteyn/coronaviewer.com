import React from 'react';

export default ({ countries, activeCountries, handleCountryChange }) => {
	return (
		<ul id="countries">
			{countries !== false && countries.map(
                ({ title, confirmed }) => (
            		<li key={title} className="d-flex align-items-center">
            			<label>
	            			<input name={title} onChange={handleCountryChange} checked={activeCountries[title]} type="checkbox" className="mr-2" />
	            			<strong>{title}</strong> ({confirmed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")})
            			</label>
        			</li>
            	)
            )}
		</ul>
	);
}