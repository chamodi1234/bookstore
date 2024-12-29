import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

const Header = ({ onCartClick }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const open = Boolean(anchorEl);
  const location = useLocation();
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    navigate("/login");
    handleClose();
  };

  const isAdminOrUserPage =
    location.pathname === "/admin" || location.pathname === "/user";
  const isHomePage = location.pathname === "/";
  const isAdminPage = location.pathname === "/admin";  

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <>
      <AppBar position="static" sx={{ bgcolor: "purple", color: "white" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">Bag Store</Typography>

          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{ display: { xs: "block", sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ display: { xs: "none", sm: "flex" } }}>
            <Button color="inherit" component={Link} to="/" sx={{ mr: 2 }}>
              Home
            </Button>

            {/* Hide Cart button if on the Admin page */}
            {!isHomePage && !isAdminPage && (
              <Button color="inherit" onClick={onCartClick} sx={{ mr: 2 }}>
                Cart
              </Button>
            )}

            {!isAdminOrUserPage && (
              <Button color="inherit" component={Link} to="/login" sx={{ mr: 2 }}>
                Login
              </Button>
            )}

            {isAdminOrUserPage && (
              <Avatar
                alt="User"
                sx={{ bgcolor: "purple", cursor: "pointer" }}
                onClick={handleMenu}
              />
            )}

            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              sx={{ mt: "45px" }}
            >
              <MenuItem onClick={handleClose}>Settings</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <List sx={{ width: 250 }}>
          <ListItem button component={Link} to="/" onClick={toggleDrawer(false)}>
            <ListItemText primary="Home" />
          </ListItem>

          
          {!isHomePage && !isAdminPage && (
            <ListItem button onClick={onCartClick}>
              <ListItemText primary="Cart" />
            </ListItem>
          )}

          {!isAdminOrUserPage && (
            <ListItem button component={Link} to="/login" onClick={toggleDrawer(false)}>
              <ListItemText primary="Login" />
            </ListItem>
          )}

          {isAdminOrUserPage && (
            <>
              <ListItem button onClick={handleMenu}>
                <ListItemText primary="Settings" />
              </ListItem>
              <ListItem button onClick={handleLogout}>
                <ListItemText primary="Logout" />
              </ListItem>
            </>
          )}
        </List>
      </Drawer>
    </>
  );
};

export default Header;
