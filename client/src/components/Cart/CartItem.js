import React from "react";
import { useSnapshot } from "valtio";
import store from "../Store/Store";
import { deleteItemFromCart, updateCartItem } from "../Api/Api";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import ButtonBase from "@mui/material/ButtonBase";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import AddBoxIcon from "@mui/icons-material/AddBox";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import { IconButton } from "@mui/material";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

const CartItem = ({ course }) => {
  const snap = useSnapshot(store);

  const increaseQty = () => {
    updateCartItem(course.quantity + 1, snap.cartId, course.id);
  };

  const decreaseQty = () => {
    if (course.quantity > 1) {
      updateCartItem(course.quantity - 1, snap.cartId, course.id);
    }
  };

  const handleRemove = () => {
    deleteItemFromCart(snap.cartId, course.id);
  };

  return (
    <Paper
      sx={{
        p: 2,
        margin: "auto",
        flexGrow: 1,
        backgroundColor: "#e0e0e0",
      }}
    >
      <Grid 
        container 
        justifyContent="center" 
        alignItems="center" 
        spacing={2}
      >
        <Grid item>
          <ButtonBase sx={{ width: 128, height: 128 }}>
            <Img alt={course.item.name} src={course.item.image} />
          </ButtonBase>
        </Grid>
        <Grid item>
          <p style={{ alignSelf: "center" }}>{course.item.name}</p>
        </Grid>
        <Grid item>
          <Stack direction="row" spacing={1}>
            <IconButton sx={{ color: "#5e35b1" }} onClick={decreaseQty}>
              <IndeterminateCheckBoxIcon />
            </IconButton>
            <p
              style={{
                alignSelf: "center",
                textAlign: "center",
              }}
            >
              {course.quantity}
            </p>
            <IconButton sx={{ color: "#5e35b1" }} onClick={increaseQty}>
              <AddBoxIcon />
            </IconButton>
            <IconButton sx={{ color: "#5e35b1" }} onClick={handleRemove}>
              <DeleteIcon />
            </IconButton>
          </Stack>
        </Grid>
        <Grid item>
          <p style={{ alignSelf: "center" }}>
            Price: £{course.total_price}
          </p>
        </Grid>
        <Grid item>
          <p style={{ alignSelf: "center" }}>
            VAT: £{course.vat}
          </p>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CartItem;
