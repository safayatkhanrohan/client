import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const getOrderDetails = createAsyncThunk("orderDetails/getOrderDetails", async (orderId) => {
    return await axios.get(`/order/${orderId}`).then((r) => r.data.order);
});

const orderDetailsSlice = createSlice({
    name: "orderDetails",
    initialState: {
        loading: false,
        orderDetails: {},
        error: null,
    },
    reducers: {
        clearErrors: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getOrderDetails.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getOrderDetails.fulfilled, (state, action) => {
            state.loading = false;
            state.orderDetails = action.payload;
        });
        builder.addCase(getOrderDetails.rejected, (state) => {
            state.loading = false;
            state.error = 'Failed to load order details';
        });
    }

});

export const { clearErrors } = orderDetailsSlice.actions;
export default orderDetailsSlice.reducer;