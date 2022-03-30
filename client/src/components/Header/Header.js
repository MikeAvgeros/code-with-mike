import React, { useState } from "react";
import { Link } from "react-router-dom";
import { logout } from "../Api/Api";
import { useSnapshot } from "valtio";
import store from "../Store/Store";
import {
  AppBar,
  Toolbar,
  Grid,
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
    ? [
        "Courses",
        "Categories",
        "Contact",
        "Wishlist",
        "Cart",
        "Profile",
        "Orders",
        "Reviews",
      ]
    : ["Courses", "Categories", "Contact", "Cart", "Login", "Signup"];

  const handleLogout = () => {
    logout(snap.token);
  };

  const renderUserSettings = () => {
    return snap.userAuthenticated ? (
      <React.Fragment>
        <IconButton onClick={openUserMenu} sx={{ p: 0 }}>
          <Avatar alt="user's avatar" src={snap.customer.image} />
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
            <Link
              style={{ textDecoration: "none", textAlign: "center" }}
              to="/profile"
            >
              Profile
            </Link>
          </MenuItem>
          <MenuItem onClick={closeUserMenu}>
            <Link
              style={{ textDecoration: "none", textAlign: "center" }}
              to="/orders"
            >
              Orders
            </Link>
          </MenuItem>
          <MenuItem onClick={closeUserMenu}>
            <Link
              style={{ textDecoration: "none", textAlign: "center" }}
              to="/reviews"
            >
              Reviews
            </Link>
          </MenuItem>
          <MenuItem onClick={handleLogout}>
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
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ 
          display: { xs: "none", md: "flex" }
        }}
      >
        <Grid item>
          <Stack direction="row" spacing={3}>
            <Link className="nav-el" to="/">
              <Image sx={{ maxWidth: "48px" }} src={logo} />
            </Link>
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
        </Grid>
        <Grid item>
          <Stack direction="row" spacing={3}>
            {snap.userAuthenticated && (
              <Link className="nav-el" to="/wishlist">
                <IconButton sx={{ color: "#fafafa", p: 0 }}>
                  <Badge
                    badgeContent={snap.wishlistItems.length}
                    color="secondary"
                  >
                    <FavoriteIcon className="header-icon" />
                  </Badge>
                </IconButton>
              </Link>
            )}
            <Link className="nav-el" to="/cart">
              <IconButton sx={{ color: "#fafafa", p: 0 }}>
                <Badge badgeContent={snap.cartItems.length} color="secondary">
                  <ShoppingCartIcon className="header-icon" />
                </Badge>
              </IconButton>
            </Link>
            {renderUserSettings()}
          </Stack>
        </Grid>
      </Grid>
    );
  };

  const renderMobileView = () => {
    return (
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ 
          display: { xs: "flex", md: "none" }
        }}
      >
        <Grid item>
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
              <MenuItem onClick={handleLogout}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            )}
          </Menu>
        </Grid>
        <Grid item>
          <Link className="nav-el" to="/">
            <Image sx={{ maxWidth: "48px" }} src={logo} />
          </Link>
        </Grid>
        <Grid item>
          <Stack direction="row" spacing={3}>
            {snap.userAuthenticated && (
              <Link className="nav-el" to="/wishlist">
                <Badge
                  badgeContent={snap.wishlistItems.length}
                  color="secondary"
                >
                  <FavoriteIcon className="header-icon" />
                </Badge>
              </Link>
            )}
            <Link className="nav-el" to="/cart">
              <Badge badgeContent={snap.cartItems.length} color="secondary">
                <ShoppingCartIcon className="header-icon" />
              </Badge>
            </Link>
          </Stack>
        </Grid>
      </Grid>
    );
  };

  return (
    <AppBar sx={{ backgroundColor: "#212121" }}>
      <Toolbar>
        {renderDesktopView()}
        {renderMobileView()}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
