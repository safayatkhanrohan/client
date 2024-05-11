import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import MetaData from "../../components/layout/MetaData";
import Loader from "../../components/layout/Loader";
import Sidebar from "../../components/admin/Sidebar";
import { getOrderDetails } from "../orderDetails/orderDetailsSlice";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, clearMessage, updateOrderStatus } from "./orderSlice";

const ProcessOrder = () => {
  const { orderDetails, loading, } = useSelector(
    (state) => state.orderDetails
  );
  const { error, message } = useSelector((state) => state.order);
  const [status, setStatus] = useState('Processing');
  const dispatch = useDispatch();
  const params = useParams();
  const orderId = params.id;
  // destructuring orderDetails
  const {
    shippingInfo,
    paymentInfo,
    orderItems,
    user,
    totalPrice,
    orderStatus,
    paidAt,
  } = orderDetails;
  if (shippingInfo) {
    var { address, city, phoneNo, postalCode, country } = shippingInfo;
  }

  
  

  useEffect(() => {
    dispatch(getOrderDetails(orderId));
    if (error) {
      toast.error(error);
      dispatch(clearErrors())
    }
    if (message) {
      toast.success(message);
      dispatch(clearMessage());
    }

  }, [error, message]);

  const updateOrderHandler = (id) => {
    dispatch(updateOrderStatus({ id, status}));
  };
  return (
    <>
      <MetaData title={`Process Order # ${orderDetails._id}`} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <>
            {loading || !shippingInfo ? (
              <Loader />
            ) : (
              <div className="row d-flex justify-content-around">
                <div className="col-12 col-lg-7 order-details">
                  <h2 className="my-5">Order #${orderDetails._id}</h2>

                  <h4 className="mb-4">Shipping Info</h4>
                  <p>
                    <b>Name: {user.name}</b>{" "}
                  </p>
                  <p>
                    <b>Phone: {phoneNo}</b>{" "}
                  </p>
                  <p className="mb-4">
                    <b>
                      Address: {`${address} ${city} ${postalCode} ${country}`}
                    </b>
                  </p>
                  <p>
                    <b>Amount:</b> ${totalPrice}
                  </p>

                  <hr />

                  <h4 className="my-4">Payment</h4>
                  <p className={paidAt ? "greenColor" : "redColor"}>
                    <b>{paidAt ? "PAID" : "NOT PAID"}</b>
                  </p>

                  <h4 className="my-4">Stripe ID</h4>
                  <p>
                    <b>{paymentInfo.id}</b>
                  </p>

                  <h4 className="my-4">Order Status:</h4>
                  <p
                    className={
                      orderStatus === "Delivered" ? "greenColor" : "redColor"
                    }
                  >
                    <b>{orderStatus}</b>
                  </p>

                  <h4 className="my-4">Order Items:</h4>

                  <hr />
                  <div className="cart-item my-1">
                    {orderItems.map((item) => (
                      <div key={item.product} className="row my-5">
                        <div className="col-4 col-lg-2">
                          <img
                            src={item.image}
                            alt={item.name}
                            height="45"
                            width="65"
                          />
                        </div>

                        <div className="col-5 col-lg-5">
                          <Link to={`/products/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>

                        <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                          <p>${item.price}</p>
                        </div>

                        <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                          <p>{item.quantity} Piece(s)</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <hr />
                </div>

                <div className="col-12 col-lg-3 mt-5">
                  <h4 className="my-4">Status</h4>

                  <div className="form-group">
                    <select
                      className="form-control"
                      name="status"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </div>

                  <button
                    className="btn btn-primary btn-block"
                    onClick={() => updateOrderHandler(orderDetails._id)}
                  >
                    Update Status
                  </button>
                </div>
              </div>
            )}
          </>
        </div>
      </div>
    </>
  );
};

export default ProcessOrder;
