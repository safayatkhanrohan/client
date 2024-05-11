import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createOder } from "../features/order/orderSlice";

const PaymentForm = () => {
  const { user } = useSelector((state) => state.user);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const paymentInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const paymentAmt = Math.round(paymentInfo.totalPrice * 100);

  const options = {
    style: {
      base: {
        fontSize: "16px",
      },
      invalid: {
        color: "#9e2146",
      },
    },
  };
        
  const order = {
    ...paymentInfo,
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    document.querySelector("#pay_btn").disabled = true;
    try {
      if (!stripe || !elements){
        return toast.error("Stripe is not loaded. Please try again later");
      }
        
      // create payment intent
      const { client_secret: clientSecret } = await axios
        .post("/payment/process", { amount: paymentAmt })
        .then((r) => r.data);

      // confirm the payment
      const { paymentIntent, error: paymentError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
          },
        },
      });

      if ( paymentIntent && paymentIntent.status === "succeeded") {
        toast.success("Payment Successful!");


        // clear cart
        // clear localsotrage
        // clear session storage

        // create order
        order.paymentInfo = {
          id: paymentIntent.id,
          status: paymentIntent.status,
        }
        dispatch(createOder(order));
        navigate("/success");
      }

      if (paymentError) {
        toast.error(paymentError.message);
        document.querySelector("#pay_btn").disabled = false;
      }
      // handle success and failure
      
      
    } catch (error) {
      document.querySelector("#pay_btn").disabled = false;
      toast.error(error.response.data.error);
    }
  };

  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form className="shadow-lg" onSubmit={handleSubmit}>
          <h1>Card Info</h1>
          <div className="form-group">
            <label htmlFor="card_num_field">Card Number</label>
            <CardNumberElement
              type="text"
              id="card_num_field"
              className="form-control py-2 my-1"
              options={options}
            />
          </div>
          <div className="form-group">
            <label htmlFor="card_exp_field">Card Expiry</label>
            <CardExpiryElement
              type="text"
              id="card_exp_field"
              className="form-control py-2 my-1"
              options={options}
            />
          </div>
          <div className="form-group">
            <label htmlFor="card_cvc_field">Card CVC</label>
            <CardCvcElement
              type="text"
              id="card_cvc_field"
              className="form-control py-2 my-1"
              options={options}
            />
          </div>
          <button
            id="pay_btn"
            type="submit"
            className="btn btn-block py-3 w-100"
            disabled={!stripe || !elements}
          >
            Pay {paymentAmt / 100} USD
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;
