import React, { useState } from 'react';
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router';
import millify from 'millify';
import { Col, Row, Typography, Select } from 'antd';
import Loader from './Loader';
import {
	useGetCryptoDetailsQuery,
	useGetCryptoHistoryQuery,
} from '../services/cryptoApi';
import LineChart from './LineChart';
import { time } from './constants';
import { getCryptoStats, getGenericStats } from './utils';

const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
	const { coinId } = useParams();
	const [timePeriod, setTimePeriod] = useState('7d');
	const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
	const { data: coinHistory } = useGetCryptoHistoryQuery({ coinId, timePeriod });
	const cryptoDetails = data?.data?.coin;

	if (isFetching) return <Loader />;

	const stats = getCryptoStats(cryptoDetails);
	const genericStats = getGenericStats(cryptoDetails);

	return (
		<Col className='coin-detail.container'>
			<Col className='coin-heading-cointainer'>
				<Title>
					{cryptoDetails.name} ({cryptoDetails.slug}) Price
				</Title>
				<p>
					{cryptoDetails.name} live price in US dollars.
					<br />
					View value statistics, market cap and supply
				</p>
			</Col>
			<Select
				defaultValue='7d'
				className='select-timeperiod'
				placeholder='Select time period'
				onChange={(value) => setTimePeriod(value)}>
				{time.map((date) => (
					<Option key={date}>{date}</Option>
				))}
			</Select>
			<LineChart
				coinHistory={coinHistory}
				currentPrice={millify(cryptoDetails.price)}
				coinName={cryptoDetails.name}
			/>
			<Col className='stats-container'>
				<Col className='coin-value-statistics'>
					<Col className='coin-value-statistics-heading'>
						<Title level={3} className='coin-details-heading'>
							{cryptoDetails.name} Value Statistics
						</Title>
						<p>An overview showing the statistics of {cryptoDetails.name}</p>
					</Col>
					{stats.map(({ icon, title, value }) => (
						<Col className='coin-stats'>
							<Col className='coin-stats-name'>
								<Text>{icon}</Text>
								<Text>{title}</Text>
							</Col>
							<Text className='stats'>{value}</Text>
						</Col>
					))}
				</Col>
				<Col className='other-stats-info'>
					<Col className='coin-value-statistics-heading'>
						<Title level={3} className='coin-details-heading'>
							{cryptoDetails.name} Other Statistics
						</Title>
						<p>An overview showing the statistics of all cryptocurrencies</p>
					</Col>
					{genericStats.map(({ icon, title, value }) => (
						<Col className='coin-stats'>
							<Col className='coin-stats-name'>
								<Text>{icon}</Text>
								<Text>{title}</Text>
							</Col>
							<Text className='stats'>{value}</Text>
						</Col>
					))}
				</Col>
			</Col>
			<Col className='coin-desc-link'>
				<Row className='coin-desc'>
					<Title level={3} className='coin-details-heading'>
						What is {cryptoDetails.name}
						{HTMLReactParser(cryptoDetails.description)}
					</Title>
				</Row>
				<Col className='coin-links'>
					<Title level={3} className='coin-details-heading'>
						{cryptoDetails.name} links
					</Title>
					{cryptoDetails.links.map((link) => (
						<a href={link.url} target='_blank' rel='noreferrer'>
							<Row className='coin-link' key={link.name}>
								<Title level={5} className='link-name'>
									{link.type}
								</Title>

								{link.name}
							</Row>
						</a>
					))}
				</Col>
			</Col>
		</Col>
	);
};

export default CryptoDetails;
