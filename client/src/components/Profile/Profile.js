import React from "react";
import {
  Container,
  Box,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import { useSnapshot } from "valtio";
import store from "../Store/Store";

const Profile = () => {
  const snap = useSnapshot(store);

  if (snap.customer.length === 0) {
    <Container component="main" maxWidth="lg">
      <h2>Unfortunately, we couldn't get your profile details.</h2>
    </Container>
  }

  return (
    <Container component="main" maxWidth="lg">
      <Box
        sx={{
          mt: 12,
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <Card sx={{ maxWidth: 300 }}>
          <CardHeader
            sx={{
              height: "24px",
              backgroundImage: "linear-gradient(to right, #5e35b1, #d81b60)",
            }}
          />
          <CardMedia
            component="img"
            width="300"
            height="250"
            image={snap.customer.image ? snap.customer.image : "../../images/blank-profile-picture.png"}
            alt={`${snap.customer.username} profile picture`}
          />
          <CardContent>
            <Typography gutterBottom variant="h6" sx={{ fontWeight: "bold" }}>
              {snap.customer.user.username}
            </Typography>
            <p>Email: {snap.customer.user.email}</p>
            <p>First Name: {snap.customer.first_name}</p>
            <p>Last Name: {snap.customer.last_name}</p>
            <p>Phone: {snap.customer.phone}</p>
            <p>Country: {snap.customer.country}</p>
            <p>Birth Date: {snap.customer.birth_date}</p>
          </CardContent>
          <CardActions>
            <Button sx={{ mb: 1, ml: 1 }} className="btn">
              Edit Profile
            </Button>
          </CardActions>
        </Card>
        <Stack direction="column" spacing={3}>
          <Typography gutterBottom variant="h6" sx={{ fontWeight: "bold" }}>
            My subscribed courses
          </Typography>
          <Stack direction="column" spacing={2}>
            {snap.customer.orders.length > 0 && snap.customer.orders.map((order, i) => (
              <div key={i}>
                {order.items.map((item, idx) => (
                  <Card key={idx}>
                    <Stack direction="row">
                    <p>
                      Course: {item.item.name}
                    </p>
                    <p>
                      Price: {item.total_price}
                    </p>
                    </Stack>
                  </Card>
                ))}
              </div>
            ))}
          </Stack>
        </Stack>
      </Box>
    </Container>
  );
};

export default Profile;
