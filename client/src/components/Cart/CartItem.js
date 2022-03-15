import React from "react";
import { useSnapshot } from "valtio";
import store from "../Store/Store";
import { api, getCartItems } from "../Api/Api";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import ButtonBase from "@mui/material/ButtonBase";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

const CartItem = ({ course }) => {
  const snap = useSnapshot(store);

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
    <Paper
      sx={{
        p: 2,
        margin: "auto",
        flexGrow: 1,
        backgroundColor: "#e0e0e0"
      }}
    >
      <Grid container alignItems="center" spacing={2}>
        <Grid item>
          <ButtonBase sx={{ width: 128, height: 128 }}>
            <Img alt={course.item.name} src={course.item.image} />
          </ButtonBase>
        </Grid>
        <Grid item>
          <p>{course.item.name}</p>
        </Grid>
        <Grid item>
          <Stack direction="row">
            <Button value={course.id} onClick={decreaseQty}>
              🡻
            </Button>
              <p style={{ alignSelf: "center" }}>
                Qty: {course.quantity}
              </p>
            <Button value={course.id} onClick={increaseQty}>
              🡹
            </Button>
          </Stack>
        </Grid>
        <Grid item>
          <p>Total: £{course.total_price}</p>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CartItem;