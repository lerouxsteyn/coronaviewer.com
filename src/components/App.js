import React from 'react';
import timeseries from '../data/timeseries';
import { ResponsiveLine } from '@nivo/line';

import Chart from './Chart';
import Header from './Header';
import Footer from './Footer';
import Countries from './Countries';
import FilterType from './FilterType';
import FilterAlign from './FilterAlign';
import FilterSortBy from './FilterSortBy';
import FilterAllNone from './FilterAllNone';
import FilterDateRange from './FilterDateRange';

function App() {
	let activeCountries = ['', 'US', 'Italy']; // 'Italy', 'US', 'United Kingdom', 'South Africa', 'Spain', 'France', 'China'

	function getTotals(timeseries) {
		let totals = {
			confirmed: 0,
			deaths: 0,
			recovered: 0,
			active: 0
		};

		Object.keys(timeseries).forEach(el => {
			let country = timeseries[el];
			let lastIndex = country.length-1;
			totals['confirmed'] += country[lastIndex].confirmed;
			totals['deaths'] += country[lastIndex].deaths;
			totals['recovered'] += country[lastIndex].recovered;
		});

		totals['active'] = totals['confirmed'] - totals['deaths'] - totals['recovered'];

		return totals;
	}

	function getData(timeseries, activeCountries, type, byDate) {
		let data = [];

		Object.keys(timeseries).forEach(el => {
			let dataArr = [];
			let country = timeseries[el];
			let lastIndex = country.length-1;
			let day_count = 1;

			if(activeCountries.indexOf(el) > 0) {
				Object.keys(country).forEach(day => {

					if(byDate || country[day].confirmed > 0) {
						let stat = {
							confirmed: country[day].confirmed,
							deaths: country[day].deaths,
							recovered: country[day].recovered,
							active: (country[day].confirmed - country[day].deaths - country[day].recovered),
						};

						dataArr.push({
							"x": (byDate) ? country[day].date : 'Day '+day_count,
							"y": stat[type]
						});

						day_count++;
					}
					
				});
		
				data.push({
					"id": el,
					"data": dataArr
				});
			}
		});

		return data;
	}

	function getCountries(timeseries) {
		let countries = [];

		Object.keys(timeseries).forEach(el => {
			let country = timeseries[el];
			let lastIndex = country.length-1;

			countries.push({
				title: el,
				confirmed: country[lastIndex].confirmed,
				deaths: country[lastIndex].deaths,
				recovered: country[lastIndex].recovered,
				active: (country[lastIndex].confirmed - country[lastIndex].deaths - country[lastIndex].recovered)
			});
		});

		//sort by confirmed, then title
		countries.sort((a, b) => (a.confirmed > b.confirmed) ? -1 : (a.confirmed === b.confirmed) ? ((a.title > b.title) ? 1 : -1) : 1 )

		return countries;
	}

	let totals = getTotals(timeseries);
	let data = getData(timeseries, activeCountries, 'confirmed', false);
	let countries = getCountries(timeseries);

	return (
		<div id="app">
			<div id="topbar" className="d-flex flex-row">
				<div className="left d-flex align-items-center">
					<a href="https://coronaviewer.com">
						<h1 className="title">Corona<strong>Viewer</strong></h1>
					</a>
				</div>
				<div className="right d-flex align-items-center">
					<Header />
				</div>
			</div>
			<div id="main" className="d-flex flex-row">
				<div className="left">
					<FilterSortBy />
					<FilterAllNone />
					<FilterAllNone />
					<Countries countries={countries} />
				</div>
				<div className="right">
					<div className="chart"><Chart data={data} /></div>
					<Footer />
				</div>
			</div>
		</div>
	);
}

export default App;
