import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getReviews = createAsyncThunk('review/getReviews', async (productId) => {
    try {
        return await axios.get(`/reviews/?id=${productId}`).then( r => r.data.reviews);
    } catch (error) {
        throw new Error(error.response.data.message);
    }
});

export const deleteReview = createAsyncThunk('review/deleteReview', async ({productId, reviewId}) => {
    console.log('productId', productId, 'reviewId', reviewId);
    try {
        await axios.delete(`/admin/reviews/?productId=${productId}&reviewId=${reviewId}`);
    } catch (error) {
        throw new Error(error.response.data.message);
    }
});

const reviewSlice = createSlice({
    name: 'review',
    initialState: {
        loading: false,
        error: null,
        reviews: [],
        success: false,
    },
    reducers: {
        clearErrors: (state) => {
            state.error = null;
        },
        reset: (state) => {
            state.success = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getReviews.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getReviews.fulfilled, (state, action) => {
            state.loading = false;
            state.reviews = [...action.payload];
        });
        builder.addCase(getReviews.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(deleteReview.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteReview.fulfilled, (state) => {
            state.loading = false;
            state.success = true;
        });
        builder.addCase(deleteReview.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
});
export const { clearErrors, reset } = reviewSlice.actions;
export default reviewSlice.reducer;