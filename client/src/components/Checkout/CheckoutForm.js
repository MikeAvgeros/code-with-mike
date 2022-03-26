import React, { useState, useEffect } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useSnapshot } from "valtio";
import store from "../Store/Store";
import { updateOrder } from "../Api/Api";
import { Container, Box, Avatar, Button, Typography } from "@mui/material";
import PaymentsIcon from "@mui/icons-material/Payments";

export default function CheckoutForm() {
  const snap = useSnapshot(store);
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!stripe) {
      return;
    }
    if (!snap.clientSecret) {
      return;
    }
    stripe.retrievePaymentIntent(snap.clientSecret).then(
      ({ paymentIntent }) => {
        setAmount(paymentIntent.amount);
        setStatus(paymentIntent.status);
        if (status === "succeeded") {
          store.successResponse = "Thank you. Payment was successful!";
          const body = JSON.stringify({
            payment_status: "Success",
            client_secret: null,
          });
          updateOrder(snap.token, body, snap.orderId, true);
        }
        if (status === "requires_payment_method") {
          const body = JSON.stringify({ client_secret: snap.clientSecret });
          updateOrder(snap.token, body, snap.orderId, false);
        }
      },
      [stripe, snap.clientSecret, status]
    );
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "https://codewithmike.herokuapp.com/orders/",
      },
    });
    if (error.type === "card_error" || error.type === "validation_error") {
      store.errorResponses = Array.from(error.message);
    }
    setIsLoading(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          mt: 12,
          mb: 7,
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
          <PaymentsIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Checkout
        </Typography>
        <Box
          component="form"
          id="payment-form"
          onSubmit={handleSubmit}
          sx={{ mt: 3 }}
        >
          <PaymentElement id="payment-element" />
          {amount && (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 2,
                mb: 2,
                backgroundImage: "linear-gradient(to right, #5e35b1, #d81b60)",
              }}
              disabled={isLoading || !stripe || !elements}
              id="submit"
            >
              <span id="button-text">
                {isLoading ? (
                  <div className="spinner" id="spinner"></div>
                ) : (
                  `Pay £${amount}`
                )}
              </span>
            </Button>
          )}
        </Box>
      </Box>
    </Container>
  );
}
