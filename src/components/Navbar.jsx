import React, { useState, useEffect } from 'react';
import { Typography, Button, Menu, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import {
	HomeOutlined,
	MoneyCollectOutlined,
	BulbOutlined,
	FundOutlined,
	MenuOutlined,
} from '@ant-design/icons';
import icon from '../images/icon.png';
import '../App.css';

const Navbar = ({ selectedMenu }) => {
	const [activeMenu, setActiveMenu] = useState(true);
	const [screenSize, setScrennSize] = useState(null);

	useEffect(() => {
		const handleResize = () => setScrennSize(window.innerWidth);

		window.addEventListener('resize', handleResize);

		handleResize();
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	useEffect(() => {
		if (screenSize < 768) {
			setActiveMenu(false);
		} else {
			setActiveMenu(true);
		}
	}, [screenSize]);

	return (
		<div className='nav-container'>
			<div className='logo-container'>
				<Avatar src={icon} size='large' />

				<Typography.Title level={2} className='logo'>
					<Link to='/'>Cryptoverse</Link>
				</Typography.Title>
			</div>
			<Button
				className='menu-control-container'
				onClick={() => setActiveMenu(!activeMenu)}>
				<MenuOutlined />
			</Button>
			{activeMenu && (
				<Menu
					theme='dark'
					selectedKeys={[selectedMenu]}
					onClick={() => {
						if (screenSize < 768) setActiveMenu(false);
					}}>
					<Menu.Item icon={<HomeOutlined />} key='/'>
						<Link to='/'>Home</Link>
					</Menu.Item>
					<Menu.Item icon={<FundOutlined />} key='/cryptocurrencies'>
						<Link to='/cryptocurrencies'>Cryptocurrencies</Link>
					</Menu.Item>
					<Menu.Item icon={<MoneyCollectOutlined />} key='/exchanges'>
						<Link to='/exchanges'>Exchanges</Link>
					</Menu.Item>
					<Menu.Item icon={<BulbOutlined />} key='/news'>
						<Link to='/news'>News</Link>
					</Menu.Item>
				</Menu>
			)}
			{/* <Button></Button> */}
		</div>
	);
};

export default Navbar;
