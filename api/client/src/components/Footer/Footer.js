import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const Footer = () => {

	const Copyright = () => {
		return (
			<Typography variant="body2" align='center'
				sx={{ color: '#fafafa' }}
			>
				{'Copyright © '}
				<Link to="/" style={{ textDecoration: 'none', color: '#fafafa'}}>
					Code with Mike
				</Link>{' '}
				{new Date().getFullYear()}
				{'.'}
			</Typography>
		);
	}

	return (
		<Box
			component="footer"
			sx={{
				py: 3,
				px: 2,
				mt: 'auto',
				backgroundColor: '#212121'
			}}
		>
			<Container maxWidth="sm">
				<Typography variant="body1" align='center' 
					sx={{ color: '#fafafa' }}
				>
					Footer
				</Typography>
				<Copyright sx={{ mt: 8, mb: 4 }} />
			</Container>
		</Box>
	);
}

export default Footer