import React, { useState, useEffect } from "react";
import { useSnapshot } from "valtio";
import store from "../Store/Store";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51KSMm8DTDaP1UOVWFtZm2PZ8mRtQmlSUz3j6GZ5IhyLIHLkg13S50EJcaaG8edguWjwrw7vWqGGPUAKAmmp4ZVpK00uyiRC50u"
);

const Checkout = () => {
  const snap = useSnapshot(store);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    setClientSecret(snap.clientSecret);
  }, [snap.clientSecret]);

  const appearance = {
    theme: "stripe",
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <React.Fragment>
      {clientSecret ? (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      ) : <p style={{ marginTop: "12vh", textAlign:"center" }}>Connecting to Stripe...</p>}
    </React.Fragment>
  );
};

export default Checkout;
