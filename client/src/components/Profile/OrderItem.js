import React, { useEffect } from "react";
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
} from "@mui/material";

const OrderItem = ({ order }) => {
  let prices = [];
  order.items.forEach((item) => prices.push(item.total_price));
  const totalAmount = prices.reduce((a, b) => a + b, 0);
  const vat = parseFloat((totalAmount * 0.2).toFixed(2));

  useEffect(() => {
    store.clientSecret = null;
  }, []);

  const handleRetryPayment = () => {
    store.clientSecret = order.client_secret;
    store.orderId = order.id;
  };

  return (
    <Card sx={{ minWidth: 275 }}>
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
              sx={{ mb: 2 }}
              spacing={2}
              direction="column"
            >
              <Grid item>
                <Stack direction="row" spacing={2}>
                  <Avatar alt={item.item.name} src={item.item.image} />
                  <p style={{ width: "250px", alignSelf: "center" }}>{item.item.name}</p>
                </Stack>
              </Grid>
              <Grid item>
                <p>Date of Purchase: {order.created_at.split("T")[0]}</p>
              </Grid>
              <Grid item>
                <p>Payment Status: {order.payment_status}</p>
              </Grid>
              <Grid item>
                <p>Quantity: {item.quantity}</p>
              </Grid>
              <Grid item>
                <p>Total Price: £{totalAmount}</p>
              </Grid>
              <Grid item>
                <p>VAT: £{vat}</p>
              </Grid>
              <Grid item>
                <p style={{ fontWeight: "bold" }}>Grand Total: £{totalAmount + vat}</p>
              </Grid>
              <Grid item>
                {order.payment_status === "Success" ? (
                  <Link
                    to={`/review/send/${order.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Button size="small" className="btn">
                      Leave a review
                    </Button>
                  </Link>
                ) : (
                  <Link to="/checkout" style={{ textDecoration: "none" }}>
                    <Button
                      size="small"
                      className="btn"
                      onClick={handleRetryPayment}
                    >
                      Retry Payment
                    </Button>
                  </Link>
                )}
              </Grid>
            </Grid>
          ))}
      </CardContent>
    </Card>
  );
};

export default OrderItem;
