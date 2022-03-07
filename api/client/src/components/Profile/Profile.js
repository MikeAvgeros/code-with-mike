import React from "react";
import { Container, Box, Card, CardHeader, CardMedia, CardContent, CardActions, Typography, Button } from "@mui/material";
import { useSnapshot } from "valtio";
import store from "../Store/Store";

const Profile = () => {
  const snap = useSnapshot(store);

  return (
    <Container component="main" maxWidth="lg">
      <Box
        sx={{
          mt: 12,
          display: "flex",
          justifyContent: "space-around"
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
            image={snap.user.image}
            alt={snap.user.user.username}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h6"
              sx={{ fontWeight: "bold" }}
            >
              {snap.user.user.username}
            </Typography>
            <p>
              Email: {snap.user.user.email}
            </p>
            <p>
              Phone: {snap.user.phone}
            </p>
            <p>
              Country: {snap.user.country}
            </p>
          </CardContent>
          <CardActions>
              <Button sx={{ mb: 1, ml: 1 }} className="btn">
                Edit Profile
              </Button>
          </CardActions>
        </Card>
        <Typography
          gutterBottom
          variant="h6"
          sx={{ fontWeight: "bold" }}
        >
          My subscribed courses
        </Typography>
      </Box>
    </Container>
  )
}

export default Profile