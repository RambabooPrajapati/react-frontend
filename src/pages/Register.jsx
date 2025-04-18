// src/pages/Register.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../store/features/authSlice";
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

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        navigate("/login");
      }
    });
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Register
      </Typography>

      {error && (
        <Alert severity="error">{error.message || "Registration failed"}</Alert>
      )}

      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="First Name"
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Last Name"
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          type="password"
          label="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
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
          {loading ? <CircularProgress size={24} /> : "Register"}
        </Button>
      </Box>
    </Container>
  );
};

export default Register;
