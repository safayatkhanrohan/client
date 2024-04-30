import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/products/productSlice";
import productDetailsReducer from "../features/products/productDetailsSlice";
import userReducer from "../features/users/userSlice";
import cartReducer from "../features/cart/cartSlice";

const store = configureStore({
    reducer: {
        products: productReducer,
        productDetails: productDetailsReducer,
        user: userReducer,
        cart: cartReducer
    }
});

export default store;
