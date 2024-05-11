import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const createOder = createAsyncThunk('order/createOrder', async (order) => {
    await axios.post('/order/new', order);
});

export const getLoggedInUserOrders = createAsyncThunk('order/getLoggedInUserOrders', async () => {
    return await axios.get('/orders/me').then( r => r.data.orders);
})

export const deleteOrder = createAsyncThunk('order/deleteOrder', async (orderId) => {
    try {
        await axios.delete(`/admin/order/${orderId}`);
    } catch (error) {
        throw new Error(error.response.data.message);
    }
});

export const updateOrderStatus = createAsyncThunk('order/updateOrder', async ({id, status}) => {
    try {
        await axios.put(`/admin/order/${id}`, {status});
    } catch (error) {
        throw new Error(error.response.data.message); 
    }
});

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        loading: false,
        orders: [],
        message: null,
        error: null,
    },
    reducers: {
        clearErrors: (state) => {
            state.error = null;
        },
        clearMessage: (state) => {
            state.message = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createOder.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createOder.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(createOder.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(getLoggedInUserOrders.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getLoggedInUserOrders.fulfilled, (state, action) => {
            state.loading = false;
            state.orders = [...action.payload];
        });
        builder.addCase(getLoggedInUserOrders.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(deleteOrder.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteOrder.fulfilled, (state) => {
            state.loading = false;
            state.message = 'Order deleted successfully';
        });
        builder.addCase(deleteOrder.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(updateOrderStatus.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateOrderStatus.fulfilled, (state) => {
            state.loading = false;
            state.message = 'Order updated successfully';
        });
        builder.addCase(updateOrderStatus.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
});
export const { clearErrors, clearMessage } = orderSlice.actions;
export default orderSlice.reducer;