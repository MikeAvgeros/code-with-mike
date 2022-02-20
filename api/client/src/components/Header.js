import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

const pages = ['Subscribe', 'Courses', 'Direction', 'Contact', 'Login'];
const settings = ['Profile', 'Dashboard', 'Logout'];

const navElStyle = {
	textDecoration: 'none', 
	color: '#fafafa',
	letterSpacing: 1
}

const Header = () => {
	const [anchorElNav, setAnchorElNav] = useState(null);
	const [anchorElUser, setAnchorElUser] = useState(null);
	const [loginUser, setLoginUser] = useState(false);

	const openNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};

	const openUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const closeNavMenu = () => {
		setAnchorElNav(null);
	};

	const closeUserMenu = () => {
		setAnchorElUser(null);
	};

	return (
		<AppBar sx={{ backgroundColor: '#212121' }}>
			<Container>
				<Toolbar disableGutters>
					<Box sx={{ flexGrow: 1, display: 'flex' }}>
						LOGO
					</Box>

					<Box sx={{ display: { xs: 'none', md: 'flex' } }}>
						{pages.map((page) => (
							<Button key={page}>
								<Link style={navElStyle} to={`./${page.toLowerCase()}`}>{page}</Link>
							</Button>
						))}
						<Button variant='contained' sx={{ backgroundColor: 'purple' }}>
							<Link style={navElStyle} to='./signup'>Signup</Link>
						</Button>
					</Box>

					<Box sx={{ display: { xs: 'flex', md: 'none' } }}>
						<IconButton
							size="large"
							aria-label="navigation menu"
							aria-controls="nav-menu"
							aria-haspopup="true"
							onClick={openNavMenu}
							color="inherit"
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id="nav-menu"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							keepMounted
							transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
							open={Boolean(anchorElNav)}
							onClose={closeNavMenu}
							sx={{
								display: { xs: 'block', md: 'none' },
							}}
						>
							{pages.map((page) => (
								<MenuItem key={page} onClick={closeNavMenu}>
									<Link to={`./${page.toLowerCase()}`}>{page}</Link>
								</MenuItem>
							))}
						</Menu>
					</Box>

					{loginUser && 
						<Box>
							<Tooltip title="Open user menu">
									<IconButton onClick={openUserMenu} sx={{ p: 0 }}>
											<Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
									</IconButton>
							</Tooltip>
							<Menu
									sx={{ mt: '45px' }}
									anchorEl={anchorElUser}
									anchorOrigin={{
											vertical: 'top',
											horizontal: 'right',
									}}
									keepMounted
									transformOrigin={{
											vertical: 'top',
											horizontal: 'right',
									}}
									open={Boolean(anchorElUser)}
									onClose={closeUserMenu}
							>
								{settings.map((setting) => (
									<MenuItem key={setting} onClick={closeUserMenu}>
										<Typography textAlign="center">{setting}</Typography>
									</MenuItem>
								))}
							</Menu>
						</Box>
					}
				</Toolbar>
			</Container>
		</AppBar>
	)
}

export default Header