import React from "react";
import { Link } from "react-router-dom";
import store from "../Store/Store";
import {
  Card,
  CardContent,
  Grid,
  CardHeader,
  Avatar,
  Button,
  Stack,
  CardActions,
} from "@mui/material";

const OrderItem = ({ order }) => {
  let prices = [];
  order.items.forEach((item) => prices.push(item.total_price));
  const totalAmount = prices.reduce((a, b) => a + b, 0);
  const vat = parseFloat((totalAmount * 0.2).toFixed(2));

  const handleRetryPayment = () => {
    store.clientSecret = order.client_secret;
    store.currentOrder.id = order.id;
    store.currentOrder.amount = totalAmount + vat;
  };

  return (
    <Card sx={{ minWidth: 300 }}>
      <CardHeader
        sx={{
          height: "24px",
          backgroundImage: "linear-gradient(to right, #5e35b1, #d81b60)",
        }}
      />
      <CardContent>
        <Stack direction="column" spacing={2}>
          {order.items &&
            order.items.map((item, i) => (
              <Grid container key={i} direction="column">
                <Grid item>
                  <Stack direction="row" spacing={1}>
                    <Avatar alt={item.item.name} src={item.item.image} />
                    <p style={{ alignSelf: "center" }}>{item.item.name}</p>
                  </Stack>
                </Grid>
                <Grid item>
                  <p>Quantity: {item.quantity}</p>
                </Grid>
                <Grid item>
                  <p>Total Price: £{item.total_price.toFixed(2)}</p>
                </Grid>
                <Grid item>
                  <p>VAT: £{item.vat.toFixed(2)}</p>
                </Grid>
              </Grid>
            ))}
          <p>Date of Purchase: {order.created_at.split("T")[0]}</p>
          <p>Payment Status: {order.payment_status}</p>
          <p style={{ fontWeight: "bold" }}>
            Grand Total: £{(totalAmount + vat).toFixed(2)}
          </p>
        </Stack>
      </CardContent>
      <CardActions>
        <Grid item>
          {order.payment_status === "Success" ? (
            <Stack direction="row" spacing={2}>
              <Link to="/" style={{ textDecoration: "none" }}>
                <Button size="small" className="btn">
                  View Content
                </Button>
              </Link>
              <Link
                to={`/review/send/${order.id}`}
                style={{ textDecoration: "none" }}
              >
                <Button size="small" className="btn">
                  Send review
                </Button>
              </Link>
            </Stack>
          ) : (
            <Stack direction="row" spacing={2}>
              <Link to="/checkout" style={{ textDecoration: "none" }}>
                <Button
                  size="small"
                  className="btn"
                  onClick={handleRetryPayment}
                >
                  Make Payment
                </Button>
              </Link>
              <Link to="/contact" style={{ textDecoration: "none" }}>
                <Button size="small" className="btn">
                  Contact Us
                </Button>
              </Link>
            </Stack>
          )}
        </Grid>
      </CardActions>
    </Card>
  );
};

export default OrderItem;
