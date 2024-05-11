import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllUsers = createAsyncThunk('allUsers/getAllUsers', async () => {
    try {
        const {users} = await axios.get('/admin/users').then(r=>r.data);
        return users;
    } catch (error) {
        throw Error(error.response.data.message);
    }
});

const allUserSlice = createSlice({
    name: "allUsers",
    initialState: {
        users: [],
        loading: false,
        error: null
    },
    reducers: {
        clearErrors: (state) => (state.error = null)
    },
    extraReducers: (builder) => {
        builder.addCase(getAllUsers.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getAllUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.users = action.payload;
        });
        builder.addCase(getAllUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    }
});


export const { clearErrors } = allUserSlice.actions;
export default allUserSlice.reducer;