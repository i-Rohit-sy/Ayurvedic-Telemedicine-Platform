import React, { useState } from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Button,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Dashboard,
  VideoCall,
  Person,
  ExitToApp,
  Schedule,
  MedicalServices,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/slices/authSlice";
import Header from "./Header";
import Footer from "./Footer";

const drawerWidth = 240;

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const menuItems = [
    {
      text: "Dashboard",
      icon: <Dashboard />,
      path: "/dashboard",
    },
    {
      text: "Consultations",
      icon: <VideoCall />,
      path: "/consultations",
    },
    ...(user?.role === "patient"
      ? [
          {
            text: "Book Consultation",
            icon: <Schedule />,
            path: "/book-consultation",
          },
          {
            text: "My Prescriptions",
            icon: <MedicalServices />,
            path: "/prescriptions",
          },
        ]
      : [
          {
            text: "My Schedule",
            icon: <Schedule />,
            path: "/manage-availability",
          },
        ]),
  ];

  const drawer = (
    <div>
      <Toolbar />
      <List>
        {menuItems.map((item) => (
          <ListItem button key={item.text} onClick={() => navigate(item.path)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Header />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 3,
          px: { xs: 2, md: 3 },
        }}
      >
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
