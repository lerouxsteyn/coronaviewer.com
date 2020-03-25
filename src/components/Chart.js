import React from 'react';
import { ResponsiveLine } from '@nivo/line';

function Chart(data) {

	return (
		<ResponsiveLine
			data={data.data}
			margin={{ top: 20, right: 150, bottom: 60, left: 60 }}
			enablePoints={true}
			xScale={{ type: 'point' }}
			yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false, reverse: false }}
			lineWidth={2}
			motionStiffness={300}
			axisTop={null}
			axisRight={null}
			axisBottom={{
				orient: 'bottom',
				tickSize: 5,
				tickPadding: 5,
				tickRotation: -90,
				legend: '',
				legendOffset: 36,
				legendPosition: 'middle'
			}}
			axisLeft={{
				orient: 'left',
				tickSize: 5,
				tickPadding: 5,
				tickRotation: 0,
				legend: '',
				legendOffset: -40,
				legendPosition: 'middle'
			}}
			colors={{ scheme: 'category10' }}
			pointSize={7}
			pointColor={{ theme: 'background' }}
			pointBorderWidth={2}
			pointBorderColor={{ from: 'serieColor' }}
			pointLabel="y"
			pointLabelYOffset={-12}
			useMesh={true}
			legends={[
				{
					anchor: 'bottom-right',
					direction: 'column',
					justify: false,
					translateX: 100,
					translateY: 0,
					itemsSpacing: 0,
					itemDirection: 'left-to-right',
					itemWidth: 80,
					itemHeight: 20,
					itemOpacity: 0.75,
					symbolSize: 12,
					symbolShape: 'circle',
					symbolBorderColor: 'rgba(0, 0, 0, .5)',
					effects: [{
						on: 'hover',
						style: {
							itemBackground: 'rgba(0, 0, 0, .03)',
							itemOpacity: 1
						}
					}]
				}
			]}
		/>
	);
}

export default Chart;