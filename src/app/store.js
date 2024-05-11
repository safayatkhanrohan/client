import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/products/productSlice";
import productDetailsReducer from "../features/products/productDetailsSlice";
import userReducer from "../features/users/userSlice";
import cartReducer from "../features/cart/cartSlice";
import orderReducer from "../features/order/orderSlice";
import orderDetailsReducer from "../features/orderDetails/orderDetailsSlice";
import allUserReducer from "../features/allUser/allUserSlice";
import newProductReducer from "../features/newProduct/newProductSlice";
import updateProductReducer from "../features/products/updateProductSlice";
import allOrderReducer from "../features/order/allOrderSlice";
import reviewReducer from "../features/reviews/reviewSlice";


const store = configureStore({
    reducer: {
        products: productReducer,
        productDetails: productDetailsReducer,
        user: userReducer,
        cart: cartReducer,
        order: orderReducer,
        orderDetails: orderDetailsReducer,
        allUsers: allUserReducer,
        newProduct: newProductReducer,
        updateProduct: updateProductReducer,
        allOrders: allOrderReducer,
        review: reviewReducer
    }
});

export default store;
