import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingInfo } from './cartSlice';
import {countries} from 'countries-list'
import { useNavigate } from 'react-router-dom';
import MetaData from '../../components/layout/MetaData';
import CheckoutSteps from './CheckoutSteps';

const ShipingInfo = () => {
    const {shippingInfo} = useSelector(state => state.cart);
    const countriesList = Object.values(countries);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState(shippingInfo);
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingInfo(formData));
        navigate('/order/confirm');
    }
    return (
        <div className="container container-fluid">
            <MetaData title={'Shipping Info'} />
            <CheckoutSteps shipping />
            <div className="row wrapper">
            <div className="col-10 col-lg-5">
                <form className="shadow-lg">
                    <h1 className="mb-4">Shipping Info</h1>
                    <div className="form-group">
                        <label htmlFor="address_field">Address</label>
                        <input
                            type="text"
                            id="address_field"
                            className="form-control"
                            value={formData.address}
                            onChange={(e) => setFormData({...formData, address: e.target.value})}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="city_field">City</label>
                        <input
                            type="text"
                            id="city_field"
                            className="form-control"
                            value={formData.city}
                            onChange={(e) => setFormData({...formData, city: e.target.value})}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone_field">Phone No</label>
                        <input
                            type="phone"
                            id="phone_field"
                            className="form-control"
                            value={formData.phoneNo}
                            onChange={(e) => setFormData({...formData, phoneNo: e.target.value})}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="postal_code_field">Postal Code</label>
                        <input
                            type="number"
                            id="postal_code_field"
                            className="form-control"
                            value={formData.postalCode}
                            onChange={(e) => setFormData({...formData, postalCode: e.target.value})}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="country_field">Country</label>
                        <select
                            id="country_field"
                            className="form-control"
                            onChange={(e) => setFormData({...formData, country: e.target.value})}
                            value={formData.country}
                            required
                        >
                            {countriesList.map((country) => (
                                <option key={country.name} value={country.name}>{country.name}</option>
                            ))} 
                        </select>
                    </div>

                    <button
                        id="shipping_btn"
                        type="submit"
                        className="btn btn-block py-3 w-100"
                        onClick={submitHandler}
                    >
                        CONTINUE
                    </button>
                </form>
            </div>
        </div>
        </div>
    );
}

export default ShipingInfo;
