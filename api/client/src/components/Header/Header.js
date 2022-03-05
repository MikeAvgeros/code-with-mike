import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../Api/Api";
import { useSnapshot } from "valtio";
import store from "../Store/Store";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Stack,
  Badge,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Image } from "mui-image";
import logo from "../../images/logo.png";
import "./Header.css";

const Header = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const snap = useSnapshot(store);

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

  const pages = snap.userAuthenticated
    ? ["Courses", "Categories", "Wishlist", "Cart", "Profile", "MyOrders"]
    : ["Courses", "Categories", "Cart", "Login", "Signup"];

  const logout = () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Token ${token}`,
      },
    };
    api.post("auth/token/logout/", token, config);
    localStorage.removeItem("token");
    localStorage.removeItem("wishlist");
    window.location.assign("http://localhost:3000/");
  };

  const renderUserSettings = () => {
    return snap.userAuthenticated ? (
      <React.Fragment>
        <IconButton onClick={openUserMenu} sx={{ p: 0 }}>
          <Avatar alt="user's avatar" src="" />
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
          <MenuItem onClick={closeUserMenu}>
            <Typography textAlign="center">Profile</Typography>
          </MenuItem>
          <MenuItem onClick={closeUserMenu}>
            <Typography textAlign="center">My Orders</Typography>
          </MenuItem>
          <MenuItem onClick={logout}>
            <Typography textAlign="center">Logout</Typography>
          </MenuItem>
        </Menu>
      </React.Fragment>
    ) : (
      <React.Fragment>
        <Link className="nav-el secondary-btn" to="/login">
          Login
        </Link>
        <Link className="nav-el primary-btn" to="/signup">
          Signup
        </Link>
      </React.Fragment>
    );
  };

  const renderDesktopView = () => {
    return (
      <React.Fragment>
        <Box
          sx={{
            flexGrow: 1,
            display: { xs: "none", md: "flex" },
            marginLeft: 5,
          }}
        >
          <Link className="nav-el" to="/">
            <Image sx={{ maxWidth: "48px" }} src={logo} />
          </Link>
          <Stack direction="row" spacing={3} sx={{ marginLeft: 5 }}>
            <Link className="nav-el" to="/courses">
              Courses
            </Link>
            <Link className="nav-el" to="/categories">
              Categories
            </Link>
            <Link className="nav-el" to="/contact">
              Contact
            </Link>
          </Stack>
        </Box>
        <Box sx={{ display: { xs: "none", md: "flex" }, marginRight: 5 }}>
          <Stack direction="row" spacing={3}>
            {snap.userAuthenticated && (
              <Link className="nav-el" to="/wishlist">
                <IconButton sx={{ color: "#fafafa", p: 0 }}>
                  <Badge badgeContent={0} color="secondary">
                    <FavoriteIcon />
                  </Badge>
                </IconButton>
              </Link>
            )}
            <Link className="nav-el" to="/cart">
              <IconButton sx={{ color: "#fafafa", p: 0 }}>
                <Badge badgeContent={0} color="secondary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Link>
            {renderUserSettings()}
          </Stack>
        </Box>
      </React.Fragment>
    );
  };

  const renderMobileView = () => {
    return (
      <React.Fragment>
        <Box
          sx={{
            flexGrow: 1,
            display: { xs: "flex", md: "none" },
            marginLeft: 2,
          }}
        >
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
                <Link
                  to={`./${page.toLowerCase()}`}
                  style={{ textDecoration: "none", color: "#212121" }}
                >
                  {page}
                </Link>
              </MenuItem>
            ))}
            {snap.userAuthenticated && (
              <MenuItem onClick={logout}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            )}
          </Menu>
        </Box>
        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
          <Link className="nav-el" to="/">
            <Image sx={{ maxWidth: "48px" }} src={logo} />
          </Link>
        </Box>
        <Box sx={{ display: { xs: "flex", md: "none" }, marginRight: 3 }}>
          <Stack direction="row" spacing={3}>
            {snap.userAuthenticated && (
              <Link className="nav-el" to="/wishlist">
                <Badge badgeContent={0} color="secondary">
                  <FavoriteIcon />
                </Badge>
              </Link>
            )}
            <Link className="nav-el" to="/cart">
              <Badge badgeContent={0} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </Link>
          </Stack>
        </Box>
      </React.Fragment>
    );
  };

  return (
    <AppBar sx={{ backgroundColor: "#212121" }}>
      <Toolbar disableGutters>
        {renderDesktopView()}
        {renderMobileView()}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
