import React from "react";
import { api, getCartItems } from "../Api/Api";
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

  const increaseQty = async (e) => {
    const cartItemId = parseInt(e.target.value);
    let currentQty = snap.cartItems.find((c) => c.id === cartItemId).quantity;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({
      quantity: currentQty + 1,
    });
    try {
      await api.patch(
        `order/carts/${snap.cartId}/items/${cartItemId}/`,
        body,
        config
      );
      getCartItems(snap.cartId);
    } catch (err) {
      alert(`An error occured while trying to update cart item.\n\r${err}`);
    }
  };

  const decreaseQty = async (e) => {
    const cartItemId = parseInt(e.target.value);
    let currentQty = snap.cartItems.find((c) => c.id === cartItemId).quantity;
    if (currentQty <= 1) return;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({
      quantity: currentQty - 1,
    });
    try {
      await api.patch(
        `order/carts/${snap.cartId}/items/${cartItemId}/`,
        body,
        config
      );
      getCartItems(snap.cartId);
    } catch (err) {
      alert(`An error occured while trying to update cart item.\n\r${err}`);
    }
  };

  return (
    <Container component="main">
      <Box
        sx={{
          mt: 12,
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
            snap.cartItems.map((cartItem, i) => (
              <Stack key={i} direction="row" spacing={5}>
                <Avatar alt="course image" src={cartItem.item.image} />
                <p
                  style={{
                    minWidth: "200px",
                    fontSize: 18,
                    alignSelf: "center",
                  }}
                >
                  {cartItem.item.name}
                </p>
                <Stack direction="row">
                  <Button value={cartItem.id} onClick={decreaseQty}>
                    🡻
                  </Button>
                  <p style={{ alignSelf: "center" }}>
                    Qty: {cartItem.quantity}
                  </p>
                  <Button value={cartItem.id} onClick={increaseQty}>
                    🡹
                  </Button>
                </Stack>
                <p
                  style={{
                    fontSize: 18,
                    alignSelf: "center",
                  }}
                >
                  £ {cartItem.total_price}
                </p>
              </Stack>
            ))
          ) : (
            <p style={{ textAlign: "center" }}>The are no items in your cart</p>
          )}
        </Stack>
        {snap.cartItems.length > 0 && (
          <Button sx={{ mt: 10 }} className="btn" onClick={checkout}>
            Checkout
          </Button>
        )}
      </Box>
    </Container>
  );
};

export default Cart;
