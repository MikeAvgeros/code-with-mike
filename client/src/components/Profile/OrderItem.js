import React from "react";
import { Card, CardContent, Grid, CardHeader, Avatar } from "@mui/material";

const OrderItem = ({ order }) => {
  return (
    <Card>
      <CardHeader
        sx={{
          height: "24px",
          backgroundImage: "linear-gradient(to right, #5e35b1, #d81b60)",
        }}
      />
      <CardContent>
        {order.items &&
          order.items.map((item, i) => (
            <Grid
              container
              key={i}
              alignItems="center"
              sx={{ mb: 2 }}
              spacing={3}
            >
              <Grid item>
                <Avatar alt={item.item.name} src={item.item.image} />
              </Grid>
              <Grid item>
                <p style={{ width: "15vw" }}>{item.item.name}</p>
              </Grid>
              <Grid item>
                <p>Qty: {item.quantity}</p>
              </Grid>
              <Grid item>
                <p>Total Price: £{item.total_price}</p>
              </Grid>
            </Grid>
          ))}
        <p>Date of Purchase: {order.created_at.split("T")[0]}</p>
        <p style={{ fontWeight: "bold" }}>Grand Total: £{order.total_price}</p>
      </CardContent>
    </Card>
  );
};

export default OrderItem;
