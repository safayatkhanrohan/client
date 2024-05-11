import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails } from "./orderDetailsSlice";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import MetaData from "../../components/layout/MetaData";
import Loader from "../../components/layout/Loader";
const OrderDetailsView = () => {
  const { orderDetails, loading, error } = useSelector(
    (state) => state.orderDetails
  );
  const dispatch = useDispatch();
  const params = useParams();
  const orderId = params.id;
  useEffect(() => {
    dispatch(getOrderDetails(orderId));
  }, [error]);
  if (error) {
    toast.error(error);
  }
  return (
    <div className="container container-fluid">
      <MetaData title="Order Details" />
      {loading ? (
        <Loader />
      ) : (
        orderDetails.shippingInfo && (
          <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8 mt-5 order-details">
              <h1 className="my-5">Order #{orderDetails._id}</h1>

              <h4 className="mb-4">Shipping Info</h4>
              <p>
                <b>Name:</b> {orderDetails.user.name}
              </p>
              <p>
                <b>Phone:</b> {orderDetails.shippingInfo.phoneNo}
              </p>
              <p className="mb-4">
                <b>Address:</b>{" "}
                {`${orderDetails.shippingInfo.address}, ${orderDetails.shippingInfo.city}, ${orderDetails.shippingInfo.postalCode}, ${orderDetails.shippingInfo.country}`}
              </p>
              <p>
                <b>Amount:</b> {orderDetails.totalPrice}
              </p>

              <hr />

              <h4 className="my-4">Payment</h4>
              <p className="greenColor">
                <b>PAID</b>
              </p>

              <h4 className="my-4">Order Status:</h4>
              <p className={(orderDetails.orderStatus === 'Processing') ? 'redColor' : 'greenColor'}>
                <b>{orderDetails.orderStatus}</b>
              </p>

              <h4 className="my-4">Order Items:</h4>
              {orderDetails.orderItems.map((item) => (
                <>
                  <hr />
                  <div className="cart-item my-1" key={item.product}>
                    <div className="row my-5">
                      <div className="col-4 col-lg-2">
                        <img src={item.image} height="45" width="65" />
                      </div>

                      <div className="col-5 col-lg-5">
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </div>

                      <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                        <p>${item.price}</p>
                      </div>

                      <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                        <p>{item.quantity} Piece{item.quantity > 1 && 's'}</p>
                      </div>
                    </div>
                  </div>
                  <hr />
                </>
              ))}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default OrderDetailsView;
