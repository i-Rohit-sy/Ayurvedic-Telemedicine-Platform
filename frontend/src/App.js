import React from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { Provider } from "react-redux";
import theme from "./utils/theme";
import store from "./store";

// Layout Components
import Layout from "./components/Layout/Layout";

// Page Components
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Dashboard from "./pages/Dashboard";
import Consultation from "./pages/Consultation";
import Profile from "./pages/Profile";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/consultation" element={<Consultation />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Layout>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
