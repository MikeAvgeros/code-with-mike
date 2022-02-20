import React, { useState } from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './Header.css'

const pages = [
  "Courses",
  "Categories",
  "Wishlist",
  "Cart",
  "Login",
];

const settings = ["Profile", "Dashboard", "Logout"];

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
    <AppBar sx={{ backgroundColor: "#212121" }}>
      <Toolbar disableGutters>
        <Box sx={{ flexGrow: 1, display: "flex", marginLeft: 5 }}>
          <Link className='nav-el' to='/'>
            LOGO
          </Link>
          <Stack direction="row" spacing={3} 
            sx={{ display: { xs: "none", md: "flex" }, marginLeft: 5 }}
          >
            <Link className='nav-el' to='/courses'>
              Courses
            </Link>
            <Link className='nav-el' to='/categories'>
              Categories
            </Link>
          </Stack>
        </Box>

        <Box sx={{ display: { xs: "none", md: "flex" }, marginRight: 5  }}>
          <Stack direction="row" spacing={3}>
            <Link className='nav-el' to='/wishlist'>
              <FavoriteIcon />
            </Link>
            <Link className='nav-el' to='/cart'>
              <ShoppingCartIcon />
            </Link>
            <Link className='nav-el secondary-btn' to='/login'>
              Login
            </Link>
            <Link className='nav-el primary-btn' to='/signup'>
              Signup
            </Link>
          </Stack>
        </Box>

          <Box sx={{ display: { xs: "flex", md: "none" } }}>
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
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={closeNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={closeNavMenu}>
                  <Link to={`./${page.toLowerCase()}`}>{page}</Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {loginUser && (
            <Box>
              <IconButton onClick={openUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
              <Menu
                sx={{ mt: "45px" }}
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
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
          )}
        </Toolbar>
    </AppBar>
  );
};

export default Header;
