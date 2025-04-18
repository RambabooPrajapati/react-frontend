// src/pages/Login.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/features/authSlice";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Container,
  Typography,
  CircularProgress,
  Alert,
  Box,
} from "@mui/material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password })).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        alert("You are logged in successfully.");
        navigate("/dashboard");
      }
    });
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>

      {error && <Alert severity="error">{error.message || error}</Alert>}

      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
          required
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Login"}
        </Button>
      </Box>
    </Container>
  );
};

export default Login;
