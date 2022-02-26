import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../Api/Api';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Alert } from '@mui/material';

const Signup = () => {
  const [accountCreated, setAccountCreated] = useState(false);
  const [formData, setFormData] = useState({
      email: '',
      username: '',
      password: '',
      re_password: ''
  });

  const { email, username, password, re_password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const signup = async (email, username, password, re_password) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const body = JSON.stringify({ email, username, password, re_password });

    try {
      const { data } = await api.post('auth/users/', body, config);
      console.log(data)
      if (data.username === username) {
        setAccountCreated(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password === re_password) {
      signup(email, username, password, re_password);
    }
  };

  if (accountCreated) {
    return (
      <Container component="main">
        <Box
          sx={{
            marginTop: 20,
            marginBottom: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
        <Alert severity='info'>
          You have successfully registered an account. You can now <Link to='/login'>login.</Link>
        </Alert>
        </Box>
      </Container>
    )
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={email}
                type="email"
                autoComplete="email"
                onChange={onChange}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                value={username}
                autoComplete="username"
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="password"
                label="Password"
                name="password"
                value={password}
                type="password"
                autoComplete="new-password"
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="re_password"
                label="Repeat Password"
                name="re_password"
                value={re_password}
                type="password"
                autoComplete="re_password"
                onChange={onChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/login">
                Already have an account? Log in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

export default Signup;