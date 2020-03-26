import React from 'react';

export default ({ totals }) => {

  	return (
	    <header className="header d-flex flex-row align-items-center justify-content-between w-100">
	    	<div className="d-flex"><h2>Coronavirus <strong>(COVID-19)</strong> dashboard</h2></div>
	    	<div className="totals d-flex flex-row">
	    		<div>
	    			<strong>Confirmed:</strong><br />
	    			<span className="total-number">{totals.confirmed}</span>
	    		</div>
	    		<div>
	    			<strong>Active:</strong><br />
	    			<span className="total-number">{totals.active}</span>
	    		</div>
	    		<div>
	    			<strong>Recoveries:</strong><br />
	    			<span className="total-number">{totals.recovered}</span>
	    		</div>
	    		<div>
	    			<strong>Deaths:</strong><br />
	    			<span className="total-number">{totals.deaths}</span>
	    		</div>
	    	</div>
	    </header>
  	);
}