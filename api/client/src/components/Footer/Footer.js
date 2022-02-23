import React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';

const Footer = () => {
	function Copyright(props) {
		return (
			<Typography variant="body2" color="text.secondary" align="center" {...props}>
				{'Copyright © '}
				<Link color="inherit" to="/">
					Code with Mike
				</Link>{' '}
				{new Date().getFullYear()}
				{'.'}
			</Typography>
		);
	}

	return (
		<Copyright sx={{ mt: 8, mb: 4 }} />
	)
}

export default Footer