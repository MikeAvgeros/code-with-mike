import React, { useState } from "react";
import { resetPasswordConfirmation } from "../Api/Api";
import {
  Avatar,
  Container,
  Box,
  Grid,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import LockResetIcon from "@mui/icons-material/LockReset";

const ResetPasswordConfirm = () => {
  const [formData, setFormData] = useState({
    new_password: null,
    re_new_password: null,
  });

  const { new_password, re_new_password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const url = window.location.href;
    const uid = url.split("/")[6];
    const token = url.split("/")[7];

    resetPasswordConfirmation(uid, token, new_password, re_new_password);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          mt: 12,
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
          <LockResetIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Confirm New Password
        </Typography>
        <Box component="form" onSubmit={onSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="new_password"
                label="New Password"
                name="new_password"
                value={new_password}
                type="password"
                autoComplete="new-password"
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="re_new_password"
                label="Repeat New Password"
                name="re_new_password"
                value={re_new_password}
                type="password"
                autoComplete="re_new_password"
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
            Reset Password
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ResetPasswordConfirm;
