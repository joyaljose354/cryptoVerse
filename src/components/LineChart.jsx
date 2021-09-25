import React from 'react';
import { Line } from 'react-chartjs-2';
import { Col, Row, Typography } from 'antd';
import { getChartData } from './utils';

const { Title } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
	const {
		data,
		options,
	} = getChartData(coinHistory);

	return (
		<>
			<Row className='chart-header'>
				<Title className='chart-title' level={2}>
					{coinName} Price Chart
				</Title>
				<Col className='price-container'>
					<Title level={5} className='price-change'>
						{coinHistory?.data?.change}%
					</Title>
					<Title level={5} className='current-price'>
						Current {coinName} Price: $ {currentPrice}
					</Title>
				</Col>
			</Row>
			<Line data={data} options={options} />
		</>
	);
};

export default LineChart;
