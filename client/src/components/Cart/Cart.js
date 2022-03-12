import React from "react";
import api from "../Api/Api";
import { useSnapshot } from "valtio";
import store from "../Store/Store";
import {
  Box,
  Container,
  Avatar,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const Cart = () => {
  const snap = useSnapshot(store);

  const checkout = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${snap.token}`,
      },
    };
    const body = JSON.stringify({ cart_id: snap.cartId });
    store.cartId = null;
    store.cartItems = [];
    try {
      await api.post("order/checkout/", body, config);
    } catch (err) {
      alert(`Unable to checkout.\n\r${err}`);
    }
  };

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
          <ShoppingCartIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Shopping Cart
        </Typography>
        <Stack direction="column" spacing={2} sx={{ mt: 5 }}>
          {snap.cartItems ? (
            snap.cartItems.map((course, i) => (
              <Stack key={i} direction="row" spacing={5}>
                <Typography>Course: {course.item.name}</Typography>
                <Typography>Quantity: {course.quantity}</Typography>
              </Stack>
            ))
          ) : (
            <Typography align="center" variant="body1">
              The are no items in your cart
            </Typography>
          )}
        </Stack>
        <Stack direction="row" spacing={2} sx={{ mt: 10 }}>
          <Button className="btn">Keep shopping</Button>
          <Button className="btn" onClick={checkout}>
            Checkout
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default Cart;
