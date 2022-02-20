import { Container, Typography } from '@mui/material';
import React from 'react';
import './Home.css'

const Home = () => {
	return (
		<main className='home'>
			<Container sx={{ display: 'grid' }}>
				<Typography variant='h2' className='home-tag'>
					Learn the coding skills you need to become an expert developer
				</Typography>
			</Container>
			
		</main>
	)
}

export default Home;