// src/pages/Dashboard.jsx
import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../store/features/authSlice";
import { useNavigate } from "react-router-dom";
import { Button, Container, Typography } from "@mui/material";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Welcome to Dashboard 🎉
      </Typography>
      <Button variant="contained" color="secondary" onClick={handleLogout}>
        Logout
      </Button>
    </Container>
  );
};

export default Dashboard;
