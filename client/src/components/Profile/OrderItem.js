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
        {order.items &&
          order.items.map((item, i) => (
            <Grid
              container
              key={i}
              sx={{ mb: 2 }}
              spacing={2}
              direction="column"
              alignItems="center"
            >
              <Grid item>
                <Avatar alt={item.item.name} src={item.item.image} />
              </Grid>
              <Grid item>
                <p style={{ width: "250px", textAlign: "center" }}>{item.item.name}</p>
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
                  <Stack direction="row" spacing={2}>
                    <Link
                      to="/"
                      style={{ textDecoration: "none" }}
                    >
                      <Button size="small" className="btn">
                        View Course
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
                      <Button
                        size="small"
                        className="btn"
                      >
                        Contact Us
                      </Button>
                    </Link>
                  </Stack>
                )}
              </Grid>
            </Grid>
          ))}
      </CardContent>
    </Card>
  );
};

export default OrderItem;
