import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../Api/Api";
import store from "../Store/Store";
import {
  Avatar,
  Button,
  TextField,
  Box,
  Typography,
  Container,
  Stack,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async (email, password) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ email, password });

    try {
      const { data } = await api.post("auth/token/login/", body, config);
      if (data.auth_token) {
        store.token = data.auth_token;
      }
    } catch (err) {
      alert(`An error occured while trying to login.\n\r${err}`);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          mt: 15,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar
          sx={{
            m: 1,
            backgroundImage: "linear-gradient(to right, #5e35b1, #d81b60)",
          }}
        >
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            value={email}
            type="email"
            autoComplete="email"
            autoFocus
            onChange={onChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            label="Password"
            name="password"
            value={password}
            type="password"
            autoComplete="current-password"
            onChange={onChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              mb: 2,
              backgroundImage: "linear-gradient(to right, #5e35b1, #d81b60)",
            }}
          >
            Log In
          </Button>
          <Stack direction="column" spacing={2}>
            <Link to="/reset_password">Forgot your password?</Link>
            <Link to="/signup">Don't have an account? Sign Up</Link>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
