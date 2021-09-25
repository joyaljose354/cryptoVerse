import React from 'react';
import Loader from './Loader';
import { Collapse, Row, Typography, Col, Avatar } from 'antd';
import HTMLReactParser from 'html-react-parser';
import { useGetExchangesQuery } from '../services/cryptoApi';
import millify from 'millify';

const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
	const { data, isFetching } = useGetExchangesQuery();

	if (isFetching) return <Loader />;

	const exchanges = data?.data?.exchanges;

	return (
		<>
			<Row style={{ padding: 10 }}>
				<Col span={6}>Exchanges</Col>
				<Col span={6}>24h Trade Volume</Col>
				<Col span={6}>Markets</Col>
				<Col span={6}>Change</Col>
			</Row>
			<Row>
				{exchanges?.map((exchange) => (
					<Col span={24}>
						<Collapse accordion>
							<Panel
								key={exchange.id}
								showArrow={false}
								header={
									<Row >
										<Col span={6}>
											<Text>
												<strong>{exchange.rank}.</strong>
											</Text>
											<Avatar className='exchange-image' src={exchange.iconUrl} />
											<Text>
												<strong>{exchange.name}</strong>
											</Text>
										</Col>
										<Col span={6}>$ {millify(exchange.volume)}</Col>
										<Col span={6}>{exchange.numberOfMarkets}</Col>
										<Col span={6}>{millify(exchange.marketShare)}</Col>
									</Row>
								}>
								{HTMLReactParser(exchange.description || '')}
								<a href={exchange.websiteUrl} target='_blank' rel='noreferrer'>
									<Text style={{ color: '#0071bd' }}>Learn More</Text>
								</a>
							</Panel>
						</Collapse>
					</Col>
				))}
			</Row>
		</>
	);
};

export default Exchanges;
