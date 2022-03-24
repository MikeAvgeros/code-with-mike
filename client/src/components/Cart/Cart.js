import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSnapshot } from "valtio";
import store from "../Store/Store";
import { getCartItems } from "../Api/Api";
import {
  Box,
  Container,
  Avatar,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CartItem from "./CartItem";

const Cart = () => {
  const snap = useSnapshot(store);

  useEffect(() => {
    getCartItems(snap.cartId);
  }, [snap.cartId]);

  const handleCheckout = () => {
    if (!snap.token) {
      store.errorResponses = [
        "You need to be logged in in order to place an order",
      ];
    }
  };

  return (
    <Container component="main">
      <Box
        sx={{
          mt: 12,
          mb: 7,
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
          Your Shopping Cart
        </Typography>
        <Stack direction="column" spacing={5} sx={{ mt: 5 }}>
          {snap.cartItems.length > 0 ? (
            snap.cartItems.map((course, i) => (
              <CartItem key={i} course={course} />
            ))
          ) : (
            <p style={{ textAlign: "center" }}>The are no items in your cart</p>
          )}
        </Stack>
        {snap.cartItems.length > 0 && (
          <Link to="/checkout" style={{ textDecoration: "none" }}>
            <Button sx={{ mt: 5 }} className="btn" onClick={handleCheckout}>
              Checkout
            </Button>
          </Link>
        )}
      </Box>
    </Container>
  );
};

export default Cart;
