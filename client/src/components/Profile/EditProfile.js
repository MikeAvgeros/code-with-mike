import React from "react";
import api from "../Api/Api";
import {
  Container,
  Box,
  Avatar,
  Button,
  TextField,
  Grid,
  Typography,
} from "@mui/material";

const EditProfile = () => {
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
          sx={{
            mt: 2,
            mb: 2,
            backgroundImage: "linear-gradient(to right, #5e35b1, #d81b60)",
          }}
        >
          Sign Up
        </Button>
        <Grid container sx={{ mb: 3 }}>
          <Grid item xs={12}>
            <Link to="/login">Already have an account? Log in</Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  </Container>
  )
};

export default EditProfile;