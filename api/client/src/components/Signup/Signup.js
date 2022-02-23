import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../Api/Api';
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
import { Alert } from '@mui/material';

const Signup = () => {
  const [accountCreated, setAccountCreated] = useState(false);
  const [formData, setFormData] = useState({
      username: '',
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      re_password: ''
  });

  const { username, first_name, last_name, email, password, re_password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const signup = async (username, first_name, last_name, email, password, re_password) => {
    const req = {
        header: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, first_name, last_name, email, password, re_password })
    };

    try {
      const { data } = await api.post('auth/users/', req.body, req.header);
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
      signup(username, first_name, last_name, email, password, re_password);
    }
  };

  if (accountCreated) {
    return (
      <Alert severity='info'>
        You have successfully signup. <Link to='/login'>You can now login.</Link>
      </Alert>
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
                id="username"
                label="Username"
                name="username"
                value={username}
                autoComplete="username"
                autoFocus
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="firstName"
                label="First Name"
                name="firstName"
                value={first_name}
                autoComplete="given-name"
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                value={last_name}
                autoComplete="family-name"
                onChange={onChange}
              />
            </Grid>
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
                id="repeat-password"
                label="Repeat Password"
                name="repeat-password"
                value={re_password}
                type="password"
                autoComplete="repeat-password"
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
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