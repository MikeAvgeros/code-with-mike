import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  Grid,
  CardHeader,
  Avatar,
  Button,
  Stack
} from "@mui/material";

const OrderItem = ({ order }) => {
  const vat = order.total_price * 0.20;

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
                <p style={{ width: "300px"}}>{item.item.name}</p>
              </Grid>
              <Grid item>
                <Stack direction="row" spacing={3}>
                  <p>Qty: {item.quantity}</p>
                  <p>Price: £{item.total_price}</p>
                </Stack>
              </Grid>
            </Grid>
          ))}
        <Grid
          container
          alignItems="center"
          sx={{ mb: 2 }}
          spacing={3}
        >
          <Grid item xs={8}>
            <p style={{ marginBottom: 2 }}>Date of Purchase: {order.created_at.split("T")[0]}</p>
            <p style={{ marginBottom: 2 }}>Payment Status: {order.payment_status}</p>
            <p style={{ fontWeight: "bold", marginBottom: 2 }}>Total Price: £{order.total_price}</p>
            <p style={{ fontWeight: "bold", marginBottom: 2 }}>VAT: £{vat}</p>
            <p style={{ fontWeight: "bold", marginBottom: 2 }}>Grand Total: £{order.total_price + vat}</p>
          </Grid>
          <Grid item xs={4} sx={{ alignSelf: "end" }}>
            {order.payment_status === "Success" ? (
              <Link to={`/review/send/${order.id}`} style={{ textDecoration: "none" }}>
                <Button size="small" className="btn">
                  Leave a review
                </Button>
              </Link>
            ) : (
              <Link to="/checkout" style={{ textDecoration: "none" }}>
                <Button size="small" className="btn">
                  Retry Payment
                </Button>
              </Link>
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default OrderItem;
