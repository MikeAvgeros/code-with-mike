import React from "react";
import { useSnapshot } from "valtio";
import store from "../Store/Store";
import {
  Container,
  Grid,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
} from "@mui/material";
import EditProfile from "./EditProfile";

const Profile = () => {
  const snap = useSnapshot(store);

  if (snap.customer.length === 0) {
    <Container component="main" maxWidth="lg">
      <h2>Unfortunately, we couldn't get your profile details.</h2>
    </Container>
  }

  return (
    <Container component="main">
      <Grid
        container
        sx={{ mt: 15, mb: 10 }}
        justifyContent="space-around"
        alignItems="center"
      >
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ minWidth: 250 }}>
            <CardHeader
              sx={{
                height: "24px",
                backgroundImage: "linear-gradient(to right, #5e35b1, #d81b60)",
              }}
            />
            <CardMedia
              component="img"
              width="250"
              height="200"
              image={snap.customer.image}
              alt={`${snap.customer.user.username} profile picture`}
            />
            <CardContent spacing={2}>
              <h3>{snap.customer.user.username}</h3>
              <p>Email: {snap.customer.user.email}</p>
              <p>First Name: {snap.customer.first_name}</p>
              <p>Last Name: {snap.customer.last_name}</p>
              <p>Phone: {snap.customer.phone}</p>
              <p>Country: {snap.customer.country}</p>
              <p>Birth Date: {snap.customer.birth_date}</p>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <EditProfile />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;
