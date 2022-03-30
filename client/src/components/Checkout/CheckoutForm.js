import React, { useState, useEffect } from "react";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { useSnapshot } from "valtio";
import store from "../Store/Store";
import { sendReceipt, updateOrder } from "../Api/Api";
import { Container, Box, Avatar, Button, Typography } from "@mui/material";
import PaymentsIcon from "@mui/icons-material/Payments";

export default function CheckoutForm() {
  const snap = useSnapshot(store);
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState(null);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    setAmount(snap.currentOrder.amount);

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      let body;
      switch (paymentIntent.status) {
        case "succeeded":
          store.successResponse = "Thank you. Payment was successful!";
          store.clientSecret = null;
          const message = 
          `This is a payment receipt for order number ${snap.currentOrder.id} for the amount of £${snap.currentOrder.amount}.
          Please keep this order id for your records.`
          sendReceipt(snap.customer.user.email, message);
          body = JSON.stringify({ payment_status: "Success" });
          updateOrder(snap.token, body, snap.currentOrder.id, true);
          break;
        case "processing":
          store.successResponse = "Your payment is processing";
          break;
        case "requires_payment_method":
          store.errorResponses = ["Your payment was not successful, please try again."];
          body = JSON.stringify({ client_secret: snap.clientSecret });
          updateOrder(snap.token, body, snap.currentOrder.id, false);
          break;
        default:
          store.errorResponses = ["Something went wrong when connecting to Stripe."];
          body = JSON.stringify({ client_secret: snap.clientSecret });
          updateOrder(snap.token, body, snap.currentOrder.id, false);
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);
    
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.href,
      },
    });
    store.errorResponses = [error.message];
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
