import React from 'react';

function Countries(countries) {
	console.log(countries);
	return (
		<ul className="list-style-none">
			{countries.countries !== false && countries.countries.map(
                ({ title, confirmed }) => (
            		<li><strong>{title}</strong> ({confirmed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")})</li>
            	)
            )}
		</ul>
	);
}

export default Countries;
