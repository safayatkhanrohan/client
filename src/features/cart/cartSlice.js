import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const addTocart = createAsyncThunk('cart/addTocart', async ({id, quantity}) => {
    const {data: {product}} = await axios.get(`product/${id}`);
    return {
        product: product._id,
        name: product.name,
        price: product.price,
        image: product.images[0].url,
        stock: product.countInStock,
        quantity,
    };
});
const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [],
        shippingInfo: localStorage.getItem('shippingInfo') ? JSON.parse(localStorage.getItem('shippingInfo')) : {},
        success: false
    },
    reducers: {
        removeItemFromCart: (state, action) => {
            state.cart = state.cart.filter((i) => i.product !== action.payload);
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        saveShippingInfo: (state, action) => {
            state.shippingInfo = action.payload;
            localStorage.setItem('shippingInfo', JSON.stringify(state.shippingInfo));
        },
        resetSuccess: (state) => {
            state.success = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addTocart.fulfilled, (state, action) => {
            const item = action.payload;
            const existItem = state.cart.find((i) => i.product === item.product);
            if (existItem) {
                state.cart = state.cart.map((i) => i.product === existItem.product ? item : i);
            } else {
                state.cart = [...state.cart, item];
            }
            localStorage.setItem('cart', JSON.stringify(state.cart));
            state.success = true;
        });
    }
    
});
export const { removeItemFromCart, saveShippingInfo, resetSuccess } = cartSlice.actions;

export default cartSlice.reducer;