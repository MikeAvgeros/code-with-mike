import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from "../Api/Api";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '' 
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async (email, password) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const body = JSON.stringify({ email, password });

    try {
      const { data } = await api.post("auth/token/login/", body, config);
      localStorage.setItem('auth_token', data.auth_token);

    } catch (err) {
        console.log(err);
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
          marginTop: 12,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
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
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, mb: 2 }}
          >
            Log In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to='/'>
                Forgot your password?
              </Link>
            </Grid>
            <Grid item>
              <Link to='/signup'>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;