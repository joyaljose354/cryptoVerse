import React, { useState } from 'react';
import { Typography, Select, Row, Col, Avatar, Card } from 'antd';
import demoImage from '../images/demoImage.jpg';
import { useGetCryptosNewsQuery } from '../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../services/cryptoApi';
import Loader from './Loader';
import moment from 'moment';

const { Text, Title } = Typography;
const { Option } = Select;

const News = ({ simplified }) => {
	const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
	const count = simplified ? 6 : 12;
	const { data: cryptoNews } = useGetCryptosNewsQuery({
		newsCategory,
		count,
	});
	const { data } = useGetCryptosQuery(100);

	if (!cryptoNews?.value) return <Loader />;
	return (
		<Row gutter={[24, 24]}>
			{!simplified && (
				<Col span={24}>
					<Select
						showSearch
						className='select-news'
						placeholder='Select a crypto'
						optionFilterProp='children'
						onChange={(value) => setNewsCategory(value)}
						filterOption={(input, option) =>
							option.children.toLowerCase().indexOf(input.toLowerCase())
						}>
						<Option value='Cryptocurrency'>Cryptocurrency</Option>
						{data?.data?.coins.map((coin) => (
							<Option value={coin.id}>{coin.name}</Option>
						))}
					</Select>
				</Col>
			)}
			{cryptoNews?.value.map((news, i) => (
				<Col xs={24} sm={12} lg={8} key={i}>
					<a href={news.url} target='_blank' rel='noreferrer'>
						<Card className='news-card' hoverable>
							<div className='news-image-container'>
								<Title className='news-title' level={4}>
									{news.name}
								</Title>
								<img
									style={{ maxWidth: 200, maxHeight: 100, borderRadius: '50%' }}
									src={news?.image?.thumbnail?.contentUrl || demoImage}
									alt=''
								/>
							</div>
							<p>
								{news.description.length > 100
									? `${news.description.substring(0, 100)}...`
									: news.description}
							</p>
							<div className='provider-container'>
								<div>
									<Avatar
										src={news?.provider[0]?.image?.thumbnail?.contentUrl || demoImage}
										alt='news'
									/>
									<Text className='provider-name'>{news.provider[0]?.name}</Text>
								</div>
								<Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
							</div>
						</Card>
					</a>
				</Col>
			))}
		</Row>
	);
};

export default News;
