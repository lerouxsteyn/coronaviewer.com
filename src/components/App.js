import React, { useState, useEffect } from 'react';
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

export default () => {

	// Fix null recoveries in data
	Object.keys(timeseries).forEach(el => {
		let lastRecovered = 0;
		let country = timeseries[el];
		Object.keys(country).forEach(day => {
			if(country[day].recovered !== null) {
				lastRecovered = country[day].recovered;
			} else {
				country[day].recovered = lastRecovered;
			}
		});	
	});

	const [countries, setCountries] = useState(getCountries(timeseries));
	const [activeCountries, setActiveCountries] = useState(getActiveCountries(countries));
	const [filters, setFilters] = useState({
		sortby: 'confirmed',
		type: 'confirmed',
		align: true
	});
	const [data, setData] = useState(getDataForChart(timeseries, activeCountries, 'confirmed', !filters.align));
	let totals = getTotals(timeseries);

	useEffect(() => {
        setData(getDataForChart(timeseries, activeCountries, filters.type, !filters.align));
    }, [activeCountries, filters]);

	function formatNum(num) {
		return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

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
			totals['recovered'] += (country[lastIndex].recovered === null) ? country[lastIndex-1].recovered : country[lastIndex].recovered;
		});

		totals['active'] = formatNum(totals['confirmed'] - totals['deaths'] - totals['recovered']);
		totals['confirmed'] = formatNum(totals['confirmed']);
		totals['deaths'] = formatNum(totals['deaths']);
		totals['recovered'] = formatNum(totals['recovered']);

		return totals;
	}

	function getDataForChart(timeseries, activeCountries, type, byDate) {
		let data = [];

		Object.keys(timeseries).forEach(el => {
			let dataArr = [];
			let country = timeseries[el];
			let lastIndex = country.length-1;
			let day_count = 1;

			if(activeCountries[el]) {
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
							"y": stat[type],
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
			let recovered = (country[lastIndex].recovered === null) ? country[lastIndex-1].recovered : country[lastIndex].recovered;
			if(recovered === null) { recovered = country[lastIndex-2].recovered; }
			if(recovered === null) { recovered = 0; }

			countries.push({
				title: el,
				confirmed: country[lastIndex].confirmed,
				deaths: country[lastIndex].deaths,
				recovered: recovered,
				active: (country[lastIndex].confirmed - country[lastIndex].deaths - recovered)
			});
		});

		//sort by confirmed, then title
		countries.sort((a, b) => (a.confirmed > b.confirmed) ? -1 : (a.confirmed === b.confirmed) ? ((a.title > b.title) ? 1 : -1) : 1 );

		return countries;
	}

	function getActiveCountries(countries) {
		let active = {};

		countries.forEach(el => {
			active[el.title] = (el.title === 'Italy' || el.title === 'US' || el.title === 'Spain') ? true : false;
		});

		return active;
	}

	function handleCountryChange(e) {
		const target = e.target;
		const value = target.checked;
		const name = target.name;

		setActiveCountries(values => ({
            ...values,
            [name]: value,
        }));
	}

	function handleFilterSortBy(e) {
		const name = e.target.name;
		const value = e.target.value;
		let c;

		if(value == 'alphabetically') {
			c = countries.sort((a, b) => (a.title > b.title) ? 1 : -1);
		} else {
			c = countries.sort((a, b) => (a[value] > b[value]) ? -1 : (a[value] === b[value]) ? ((a.title > b.title) ? 1 : -1) : 1 );
		}

		setCountries(c);

		setFilters(values => ({
            ...values,
            [name]: value,
        }));
	}

	function handleFilter(e) {
		const target = e.target;
		const value = (target.type == 'checkbox') ? target.checked : target.value;
		const name = target.name;

		setFilters(values => ({
            ...values,
            [name]: value,
        }));
	}

	return (
		<div id="app">
			<div id="topbar" className="d-flex flex-row">
				<div className="left d-flex align-items-center">
					<a href="https://coronaviewer.com">
						<h1 className="title">Corona<strong>Viewer</strong></h1>
					</a>
				</div>
				<div className="right d-flex align-items-center">
					<Header totals={totals} />
				</div>
			</div>
			<div id="main" className="d-flex flex-row">
				<div className="left">
					<FilterSortBy filters={filters} handleFilterSortBy={handleFilterSortBy} />
					<FilterAllNone />
					<Countries countries={countries} filters={filters} activeCountries={activeCountries} handleCountryChange={handleCountryChange} />
				</div>
				<div className="right">
					<div id="filters" className="d-flex align-items-center justify-content-between">
						<FilterType filters={filters} handleFilter={handleFilter} />
						<FilterAlign filters={filters} handleFilter={handleFilter} />
					</div>
					<div className="chart">
						<Chart data={data} />
					</div>
					<Footer />
				</div>
			</div>
		</div>
	);
}
