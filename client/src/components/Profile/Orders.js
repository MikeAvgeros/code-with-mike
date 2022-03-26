import React, { useEffect } from "react";
import { useSnapshot } from "valtio";
import store from "../Store/Store";
import { getOrders } from "../Api/Api";
import { Container, Grid } from "@mui/material";
import OrderItem from "./OrderItem";

const Orders = () => {
  const snap = useSnapshot(store);

  useEffect(() => {
    getOrders(snap.token);
  }, [snap.token])

  return (
    <Container sx={{ mt: 12, mb: 5 }}>
      <h2 style={{ textAlign: "center" }}>
        My Orders
      </h2>
      <p style={{ marginBottom: 20, marginTop: 10, textAlign: "center" }}>
        Below you can find a detailed history of all your orders.
      </p>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={5}
      >
        {snap.orders &&
          snap.orders.map((order, i) => (
            <Grid item key={i} xs={12} sm={6} md={4}>
              <OrderItem order={order} />
            </Grid>
          ))}
      </Grid>
    </Container>
  )
};

export default Orders;
