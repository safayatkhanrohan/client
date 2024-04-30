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

export const productSlice = createSlice({
    name: 'products',
    initialState: {
        loading: false,
        products: [],
        error: null
    },
    reducers: {
        clearError: (state) => {
            state.error = null;
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
    }
});
export const { clearError } = productSlice.actions;

export default productSlice.reducer;