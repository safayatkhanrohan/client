import React from "react";
import MetaData from "../../components/layout/MetaData";
import CheckoutSteps from "./CheckoutSteps";

import { loadStripe } from "@stripe/stripe-js";
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
  CardNumberElement,
} from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";

const Payment = () => {
  const { user } = useSelector((state) => state.user);
  const { cart, shippingInfo } = useSelector((state) => state.cart);
  return (
    <>
      <MetaData title={"Payment"} />
      <CheckoutSteps shipping confirmOrder payment />

      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg">
            <h1 className="mb-4">Card Info</h1>
            <div className="form-group">
              <label>Card Number</label>
              <CardNumberElement
                type="text"
                id="card_num_field"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Card Expiry</label>
              <input
                type="text"
                id="card_exp_field"
                className="form-control"
                value=""
              />
            </div>
            <div className="form-group">
              <label>Card CVC</label>
              <input
                type="text"
                id="card_cvc_field"
                className="form-control"
                value=""
              />
            </div>
            <button id="pay_btn" type="submit" className="btn btn-block py-3 w-100">
              Pay
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Payment;
