import React from "react";
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
          {snap.cart ? (
            snap.cart.map((item, i) => (
              <Stack key={i} direction="row" spacing={5}>
                <Typography>Course: {item.item.name}</Typography>
                <Typography>Quantity: {item.quantity}</Typography>
              </Stack>
            ))
          ) : (
            <Typography align="center" variant="body1">
              The are no items in your cart
            </Typography>
          )}
        </Stack>
        <Stack direction="row" spacing={2} sx={{ mt: 10 }}>
          <Button className="btn">
            Keep shopping
          </Button>
          <Button className="btn">
            Checkout
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default Cart;
