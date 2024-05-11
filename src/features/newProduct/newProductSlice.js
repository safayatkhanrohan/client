import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
export const createNewProdct = createAsyncThunk('newProduct/createNewProduct', async (productData) => {
    try {
        const data = await axios.post('/admin/product/new', productData).then(r=>r.data);
        return data;
    } catch (error) {
        throw Error(error.response.data.message);
    }
});

const newProductSlice = createSlice({
    name: 'newProduct',
    initialState: {
        loading: false,
        product: {},
    },
    reducers: {
        clearErrors: (state) => (state.error = null),
        clearMessage: (state) => (state.message = null)
    },

    extraReducers: (builder) => {
        builder.addCase(createNewProdct.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(createNewProdct.fulfilled, (state, action) => {
            state.loading = false;
            state.product = action.payload.product;
            toast.success('Product created successfully');
        });
        builder.addCase(createNewProdct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            toast.error(action.error.message);
        });
    }

});
export const { clearErrors, clearMessage } = newProductSlice.actions;
export default newProductSlice.reducer;