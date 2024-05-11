import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const getAllOrders = createAsyncThunk('allOrder/getAllOrders', async () => {
    try {
        return await axios.get('/admin/orders').then( r => r.data);
    } catch (error) {
        throw new Error(error.response.data.message);
    }
});



const allOrderSlice = createSlice({
    name: 'allOrder',
    initialState: {
        loading: false,
        orders: [],
        totalAmount: 0,
        error: null,
    },
    reducers: {
        clearErrors: (state) => {
            state.error = null;
        },
        reset: state => state.success = false,
    },
    extraReducers: (builder) => {
        builder.addCase(getAllOrders.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllOrders.fulfilled, (state, action) => {
            state.loading = false;
            state.orders = [...action.payload.orders];
            state.totalAmount = action.payload.totalAmount;
        });
        builder.addCase(getAllOrders.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
});
export const { clearErrors } = allOrderSlice.actions;
export default allOrderSlice.reducer;