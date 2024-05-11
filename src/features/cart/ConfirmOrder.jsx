import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import MetaData from '../../components/layout/MetaData';
import CheckoutSteps from './CheckoutSteps';
import { useNavigate } from 'react-router-dom';

const ConfirmOrder = () => {
    const {user} = useSelector(state => state.user);
    const {cart, shippingInfo} = useSelector(state => state.cart);
    const navigate = useNavigate();

    // Calculate Order Prices
    const itemsPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
    const shippingPrice = itemsPrice > 200 ? 0 : 25;
    const taxPrice = Number((0.05 * itemsPrice).toFixed(2));
    const totalPrice = Number(itemsPrice) + shippingPrice + taxPrice;
    const handleConfirmOrder = () => {
        const data = {
            itemsPrice: itemsPrice,
            shippingPrice: shippingPrice,
            taxPrice: taxPrice,
            totalPrice: totalPrice,
            orderItems: cart,
            shippingInfo: shippingInfo
        }
        sessionStorage.setItem('orderInfo', JSON.stringify(data));
        navigate('/payment');
    }
    return (
        <div className="container container-fluid">
            <MetaData title={'Confirm Order'} />
            <CheckoutSteps shipping confirmOrder />
            <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8 mt-5 order-confirm">
                <h4 className="mb-3">Shipping Info</h4>
                <p><b>Name:</b> {user && user.name}</p>
                <p><b>Phone:</b> {shippingInfo.phoneNo}</p>
                <p className="mb-4"><b>Address:</b> {`${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}}`}</p>
                <hr />
                <h4 className="mt-4">Your Cart Items:</h4>
                {cart.map(item => (
                    <Fragment key={item.product}>
                    <hr />
                    <div className="cart-item my-1" >
                        <div className="row">
                            <div className="col-4 col-lg-2">
                                <img src={item.image} alt='product-image' height="45" width="65" />
                            </div>
                            <div className="col-5 col-lg-6">
                                <a href="#">{item.name}</a>
                            </div>
                            <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                                <p>{item.quantity} x {item.price} = <b>{item.quantity * item.price}</b></p>
                            </div>
                        </div>
                    </div>
                    <hr />
                    </Fragment>
                ))}
            </div>
            <div className="col-12 col-lg-3 my-4">
                <div id="order_summary">
                    <h4>Order Summary</h4>
                    <hr />
                    <p>Subtotal:  <span className="order-summary-values">${itemsPrice}</span></p>
                    <p>Shipping: <span className="order-summary-values">${shippingPrice}</span></p>
                    <p>Tax:  <span className="order-summary-values">${taxPrice}</span></p>
                    <hr />
                    <p>Total: <span className="order-summary-values">${totalPrice}</span></p>
                    <hr />
                    <button id="checkout_btn" className="btn btn-primary btn-block" onClick={handleConfirmOrder}>Proceed to Payment</button>
                </div>
            </div>
        </div>
        </div>
    );
}

export default ConfirmOrder;

