import React from "react";
import {
  Box,
  Container,
  Avatar,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const Cart = ({ items }) => {
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
            backgroundImage: "linear-gradient(to right, #512da8, #c2185b)",
          }}
        >
          <ShoppingCartIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Shopping Cart
        </Typography>
        <Stack direction="column" spacing={2} sx={{ mt: 5 }}>
          {items ? (
            items.map((item, i) => <Stack direction="row" spacing={3}></Stack>)
          ) : (
            <Typography align="center" variant="body1">
              The are no items in your cart
            </Typography>
          )}
        </Stack>
        <Stack direction="row" spacing={2} sx={{ mt: 10 }}>
          <Button
            variant="contained"
            sx={{
              backgroundImage: "linear-gradient(to right, #512da8, #c2185b)",
            }}
          >
            Keep shopping
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundImage: "linear-gradient(to right, #512da8, #c2185b)",
            }}
          >
            Checkout
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default Cart;
