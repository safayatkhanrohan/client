import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../../components/layout/MetaData";
import { Link, useNavigate } from "react-router-dom";
import { addTocart, removeItemFromCart } from "./cartSlice";

const CartView = () => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
    const increaseQuantity = (id, qty, stock) => {
        if(qty <= stock) {
            const quantity = qty + 1;
            dispatch(addTocart({id, quantity}));
        }

    }
    const decreaseQuantity = (id, qty) => {
        if(qty > 1) {
            const quantity = qty - 1;
            dispatch(addTocart({id, quantity}));
        }
    }
  return (
    <>
      <MetaData title={"Your Cart"} />
      {cart.length === 0 ? (
        <h2 className="mt-5">Your Cart is Empty</h2>
      ) : (
        <>
          <div className="container container-fluid">
            <h2 className="mt-5">
              Your Cart: <b>{cart.length}</b>
            </h2>

            <div className="row d-flex justify-content-between">
              <div className="col-12 col-lg-8">
                {cart.map((item) => (
                    <div key={item.product}>
                    <hr />
                    <div className="cart-item" >
                  <div className="row">
                    <div className="col-4 col-lg-3">
                      <img
                        src={item.image}
                        height="90"
                        width="115"
                      />
                    </div>

                    <div className="col-5 col-lg-3">
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </div>

                    <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                      <p id="card_item_price">{item.price}</p>
                    </div>

                    <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                      <div className="stockCounter d-inline">
                        <span className="btn btn-danger minus" onClick={() => decreaseQuantity(item.product, item.quantity)}>-</span>
                        <input
                          type="number"
                          className="form-control count d-inline"
                          value={item.quantity}
                          readOnly
                        />
                        <span className="btn btn-primary plus" onClick={() => increaseQuantity(item.product, item.quantity, item.stock)}>+</span>
                      </div>
                    </div>

                    <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                      <i
                        id="delete_cart_item"
                        className="fa fa-trash btn btn-danger"
                        onClick={()=> dispatch(removeItemFromCart(item.product))}
                      ></i>
                    </div>
                  </div>
                </div> 
                    </div>
                ))}
                <hr />
              </div>

              <div className="col-12 col-lg-3 my-4">
                <div id="order_summary">
                  <h4>Order Summary</h4>
                  <hr />
                  <p>
                    Subtotal:{" "}
                    <span className="order-summary-values">{cart.reduce((accumulator, current) => accumulator + current.quantity, 0)} (Units)</span>
                  </p>
                  <p>
                    Est. total:{" "}
                    <span className="order-summary-values">{cart.reduce((accumulator, current) => accumulator + current.quantity * current.price, 0).toFixed(2)}</span>
                  </p>

                  <hr />
                  <button
                    id="checkout_btn"
                    className="btn btn-primary btn-block"
                    onClick={() => navigate('/shiping')}
                  >
                    Check out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CartView;
