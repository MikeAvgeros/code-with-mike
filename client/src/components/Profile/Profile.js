import React, { useEffect } from "react";
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
import api from "../Api/Api";

const Profile = () => {
  const snap = useSnapshot(store);

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    };
    try {
      const { data } = await api.get("order/checkout/", config);
      store.orders = data;
    } catch (err) {
      alert(`An error occured while trying to get the orders.\n\r${err}`);
    }
  };

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
            image={snap.user.length > 0 && snap.user.image}
            alt="user's image"
          />
          <CardContent>
            <Typography gutterBottom variant="h6" sx={{ fontWeight: "bold" }}>
              {snap.user.length > 0 && snap.user.user.username}
            </Typography>
            <p>Email: {snap.user.length > 0 && snap.user.user.email}</p>
            <p>Phone: {snap.user.length > 0 && snap.user.phone}</p>
            <p>Country: {snap.user.length > 0 && snap.user.country}</p>
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
            {snap.orders.length > 0 && snap.orders.map((order, i) => (
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
