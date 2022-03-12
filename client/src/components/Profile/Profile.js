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
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Card sx={{ maxWidth: 350 }}>
          <CardHeader
            sx={{
              height: "24px",
              backgroundImage: "linear-gradient(to right, #5e35b1, #d81b60)",
            }}
          />
          <CardMedia
            component="img"
            width="350"
            height="250"
            image={snap.customer.image}
            alt={`${snap.customer.user.username} profile picture`}
          />
          <CardContent spacing={2}>
            <h3 style={{ fontWeight: "bold" }}>
              {snap.customer.user.username}
            </h3>
            <p>Email: {snap.customer.user.email}</p>
            <p>First Name: {snap.customer.first_name}</p>
            <p>Last Name: {snap.customer.last_name}</p>
            <p>Phone: {snap.customer.phone}</p>
            <p>Country: {snap.customer.country}</p>
            <p>Birth Date: {snap.customer.birth_date}</p>
          </CardContent>
        </Card>
        <EditProfile />
      </Grid>
    </Container>
  );
};

export default Profile;
