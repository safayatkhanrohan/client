import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProductDetails = createAsyncThunk(
  "productDetails/fetchProductDetails",
  async (productId) => {
    try {
      const { data } = await axios.get(`/product/${productId}`);
      return data.product;
    } catch (error) {
      throw Error(error.response.data.message);
    }
  }
);

export const createProductReview = createAsyncThunk('productDetails/createProductReview', async ({productId, rating, comment}) => {
  try {
      await axios.put('/review', {productId, rating, comment});
  } catch (error) {
      throw Error(error.response.data.message);
  }
});

export const getProductReviews = createAsyncThunk('productDetails/getProductReviews', async (productId) => {
  try {
      const {data} = await axios.get(`/reviews?id=${productId}`);
      return data;
  } catch (error) {
      throw Error(error.response.data.message);
  }
});

export const deleteProductReview = createAsyncThunk('productDetails/deleteProductReview', async (reviewId) => {
  try {
      await axios.delete(`/reviews?reviewId=${reviewId}`);
  } catch (error) {
      throw Error(error.response.data.message);
  }
});


const productDetailsSlice = createSlice({
  name: "productDetails",
  initialState: {
    loading: false,
    product: null,
    error: null,
    success: false,
  },
  reducers: {
    clearError: state => state.error = null,
    clearMessage: state => state.success = false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.product = action.payload;
        state.loading = false;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
      builder.addCase(createProductReview.pending, (state) => {
        state.loading = true;
        state.success = false;
    });
    builder.addCase(createProductReview.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
    });
    builder.addCase(createProductReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
    });
    builder.addCase(getProductReviews.pending, (state) => {
        state.loading = true;
    });
    builder.addCase(getProductReviews.fulfilled, (state) => {
        state.loading = false;
    });
    builder.addCase(getProductReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
    });
    builder.addCase(deleteProductReview.pending, (state) => {
        state.loading = true;
    });
    builder.addCase(deleteProductReview.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
    });
    builder.addCase(deleteProductReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
    });
  },
});

export default productDetailsSlice.reducer;
