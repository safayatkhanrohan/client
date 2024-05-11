import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from "axios";
import PaymentForm from "../../components/PaymentForm";
import CheckoutSteps from "./CheckoutSteps";

const Payment = () => {
  const [stripeApiKey, setStripeApiKey] = useState("");
  useEffect(() => {
    axios
      .get("/stripeapi")
      .then((res) => setStripeApiKey(res.data.stripeApiKey));
  }, []);
  const stripePromise = (stripeApiKey !== "") && loadStripe(stripeApiKey);
  return (
    <div className="container container-fluid">
      <CheckoutSteps shipping confirmOrder payment />
          {(stripeApiKey !== "") && (
            <Elements stripe={stripePromise}>
            <PaymentForm />
          </Elements>
          )}
    </div>
  );
};

export default Payment;
