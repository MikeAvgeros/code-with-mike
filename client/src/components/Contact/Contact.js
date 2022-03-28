import React, { useState } from "react";
import { sendEmail } from "../Api/Api";
import store from "../Store/Store";
import { useSnapshot } from "valtio";
import {
  Box,
  Container,
  Grid,
  Avatar,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";

const Contact = () => {
  const snap = useSnapshot(store);

  const [formData, setFormData] = useState({
    email: snap.customer.user ? snap.customer.user.email : "",
    name: snap.customer.user ? snap.customer.user.username : "",
    message: "",
  });

  const { email, name, message } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    sendEmail(email, name, message);
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
          <EmailIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Contact our team
        </Typography>
        <Box component="form" onSubmit={onSubmit} sx={{ mt: 3 }}>
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
                id="name"
                label="Name"
                name="name"
                value={name}
                autoComplete="name"
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                multiline
                minRows={5}
                id="message"
                label="Message"
                name="message"
                value={message}
                autoComplete="message"
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
            Send
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Contact;
