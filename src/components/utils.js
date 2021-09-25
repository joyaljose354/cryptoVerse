import {
	MoneyCollectOutlined,
	DollarCircleOutlined,
	FundOutlined,
	ExclamationCircleOutlined,
	StopOutlined,
	TrophyOutlined,
	NumberOutlined,
	ThunderboltOutlined,
	CheckOutlined,
} from '@ant-design/icons';
import millify from 'millify';

export const getCryptoStats = (cryptoDetails) => {
	return [
		{
			title: 'Price to USD',
			value: `$ ${cryptoDetails.price && millify(cryptoDetails.price)}`,
			icon: <DollarCircleOutlined />,
		},
		{ title: 'Rank', value: cryptoDetails.rank, icon: <NumberOutlined /> },
		{
			title: '24h Volume',
			value: `$ ${cryptoDetails.volume && millify(cryptoDetails.volume)}`,
			icon: <ThunderboltOutlined />,
		},
		{
			title: 'Market Cap',
			value: `$ ${cryptoDetails.marketCap && millify(cryptoDetails.marketCap)}`,
			icon: <DollarCircleOutlined />,
		},
		{
			title: 'All-time-high(daily avg.)',
			value: `$ ${millify(cryptoDetails.allTimeHigh.price)}`,
			icon: <TrophyOutlined />,
		},
	];
};

export const getGenericStats = (cryptoDetails) => {
	return [
		{
			title: 'Number Of Markets',
			value: cryptoDetails.numberOfMarkets,
			icon: <FundOutlined />,
		},
		{
			title: 'Number Of Exchanges',
			value: cryptoDetails.numberOfExchanges,
			icon: <MoneyCollectOutlined />,
		},
		{
			title: 'Aprroved Supply',
			value: cryptoDetails.approvedSupply ? <CheckOutlined /> : <StopOutlined />,
			icon: <ExclamationCircleOutlined />,
		},
		{
			title: 'Total Supply',
			value: `$ ${millify(cryptoDetails.totalSupply)}`,
			icon: <ExclamationCircleOutlined />,
		},
		{
			title: 'Circulating Supply',
			value: `$ ${millify(cryptoDetails.circulatingSupply)}`,
			icon: <ExclamationCircleOutlined />,
		},
	];
};

export const getChartData = (coinHistory) => {
	const coinPrice = [];
	const coinTimeStamp = [];

	for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
		coinPrice.push(coinHistory.data.history[i].price);
		coinTimeStamp.push(
			new Date(coinHistory?.data?.history[i].timestamp).toLocaleDateString()
		);
	}

	const data = {
		labels: coinTimeStamp,
		datasets: [
			{
				label: 'Price in USD',
				data: coinPrice,
				fill: false,
				backgroundColor: '#0071bd',
				borderColor: '#0071bd',
			},
		],
	};

	const options = {
		scales: {
			yAxes: [
				{
					ticks: {
						beginAtZero: true,
					},
				},
			],
		},
	};

	return { data, options };
};
