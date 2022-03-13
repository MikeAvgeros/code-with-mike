import React, { useState } from "react";
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
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const Cart = () => {
  const snap = useSnapshot(store);
  const [qty, setQty] = useState();

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

  const increaseQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  const decreaseQty = () => {
    if (qty > 1) {
      setQty((prevQty) => prevQty - 1);
    }
  };

  return (
    <Container component="main">
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
          Your Shopping Cart
        </Typography>
        <Stack direction="column" spacing={2} sx={{ mt: 5 }}>
          {snap.cartItems.length > 0 ? (
            snap.cartItems.map((course, i) => (
              <Stack key={i} direction="row" spacing={5}>
                <p style={{ minWidth: "250px", fontSize: 18 }}>{course.item.name}</p>
                <Stack direction="row">
                  <Button onClick={decreaseQty}>
                    <ArrowDropDownIcon />
                  </Button>
                  <p>Qty: {course.quantity}</p>
                  <Button onClick={increaseQty}>
                    <ArrowDropUpIcon />
                  </Button>
                </Stack>
              </Stack>
            ))
          ) : (
            <p style={{ textAlign: "center" }}>The are no items in your cart</p>
          )}
        </Stack>
        {snap.cartItems.length >0 && (
          <Button sx={{ mt: 10 }} className="btn" onClick={checkout}>
            Checkout
          </Button>
        )}
      </Box>
    </Container>
  );
};

export default Cart;
