import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const updateProduct = createAsyncThunk(
  "products/updateProduct", async ({ id, updateOptions }) => {
    try {
      await axios.put(`/admin/product/${id}`, updateOptions)
    } catch (error) {
      throw Error(error.response.data.message);
    }
  }
);

const updateProductSlice = createSlice({
  name: "updateProduct",
  initialState: {
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    reset: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateProduct.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
    });
    builder.addCase(updateProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { clearError, reset } = updateProductSlice.actions;
export default updateProductSlice.reducer;
