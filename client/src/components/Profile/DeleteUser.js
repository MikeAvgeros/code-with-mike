import React, { useState } from "react";
import { deleteUser } from "../Api/Api";
import { useSnapshot } from "valtio";
import store from "../Store/Store";
import {
  Avatar,
  Container,
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";

const DeleteUser = () => {
  const snap = useSnapshot(store);

  const [formData, setFormData] = useState({
    password: "",
  });

  const { password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    deleteUser(snap.token, password);
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
          <PersonRemoveIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Delete Account
        </Typography>
        <Box component="form" onSubmit={onSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            label="Password"
            name="password"
            value={password}
            type="password"
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
            Delete Account
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default DeleteUser;
