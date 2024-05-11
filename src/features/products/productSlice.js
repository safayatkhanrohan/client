import axios from 'axios'
import { createAsyncThunk, createSlice} from "@reduxjs/toolkit"

export const fetchProducts = createAsyncThunk('products/fetchProducts', async ({pagination = 1, keyword = '', price, category, rating}) => {
    try {
        let link = `products/?keyword=${keyword}&page=${pagination}&price[lte]=${price[1]}&price[gte]=${price[0]}&rating[gte]=${rating}`;
        if (category) {
            link = `products/?keyword=${keyword}&page=${pagination}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category}&rating[gte]=${rating}`
        }
        const response = await axios.get(link);
        
        const { data } = response;
        return data;
    } catch (error) {
        throw Error(error.response.data.message);
    }
});

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id) => {
    try {
        await axios.delete(`/admin/product/${id}`);
    } catch (error) {
        error.response.data.message;
    }
});

export const getAdminProducts = createAsyncThunk('products/getAdminProducts', async () => {
    try {
        const {products} = await axios.get('/admin/products').then( r => r.data);
        return products;
    } catch (error) {
        throw Error(error.response.data.message);
    }
});

export const productSlice = createSlice({
    name: 'products',
    initialState: {
        loading: false,
        allProducts: [],
        products: [],
        error: null,
        message: null
    },
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        clearMessage: (state) => {
            state.message = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.products = action.payload;
            state.loading = false;
        });
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
        builder.addCase(getAdminProducts.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAdminProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.allProducts = action.payload;
        });
        builder.addCase(getAdminProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
        builder.addCase(deleteProduct.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteProduct.fulfilled, (state) => {
            state.loading = false;
            state.message = 'Product deleted successfully';
        });
        builder.addCase(deleteProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    }
});
export const { clearError, clearMessage } = productSlice.actions;

export default productSlice.reducer;