import axios from 'axios'
import { createAsyncThunk, createSlice} from "@reduxjs/toolkit"

export const loginUser = createAsyncThunk('user/loginUser', async (user) => {
    try {
        const response = await axios.post('/login', user);
        return response.data;
    } catch (error) {
        throw Error(error.response.data.message);
    }
});

export const registerUser = createAsyncThunk('user/registerUser', async (user) => {
    try {
        const response = await axios.post('/register', user);
        return response.data;
    } catch (error) {
        throw Error(error.response.data.message);
    }
});

export const loadUser = createAsyncThunk('user/loadUser', async () => {
    try {
        const response = await axios.get('/me');
        return response.data;
    } catch (error) {
        throw Error(error.response.data.message);
    }
});

export const logOutUser = createAsyncThunk('user/logOutUser', async () => {
    try {
        const response = await axios.get('/logout');
    } catch (error) {
        throw Error(error.response.data.message);
    }
});

export const updatePassword = createAsyncThunk('user/updatePassword', async (passwords) => {
    try {
        const response = await axios.put('/password/update', passwords);
        return response.data;
    } catch (error) {
        throw Error(error.response.data.message);
    }
});

export const updateProfile = createAsyncThunk('user/updateProfile', async (user) => {
    try {
        const response = await axios.put('/me/update', user);
        return response.data;
    } catch (error) {
        throw Error(error.response.data.message);
    }
});

export const forgotPassword = createAsyncThunk('user/forgotPassword', async (email) => {
    try {
        const response = await axios.post('/password/forgot', email);
        return response.data;
    } catch (error) {
        throw Error(error.response.data.message);
    }
});

export const resetPassword = createAsyncThunk('user/resetPassword', async ({token, formData}) => {
    console.log(token, formData)
    try {
        const response = await axios.put(`/password/reset/${token}`, formData);
        return response.data;
    } catch (error) {
        throw Error(error.response.data.message);
    }
});

const userSlice = createSlice({
    name: 'user',
    initialState: {
        loading: false,
        isAuthenticated: false,
        user: '',
        error: null,
        isUpdated: false,
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
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.isAuthenticated = true;
            state.loading = false;
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
        builder.addCase(registerUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(registerUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
        builder.addCase(loadUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(loadUser.fulfilled, (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = {...action.payload.user};
        });
        builder.addCase(loadUser.rejected, (state) => {
            state.loading = false;
            state.user = null;
        });
        builder.addCase(logOutUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(logOutUser.fulfilled, (state) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
        });
        builder.addCase(logOutUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
        builder.addCase(updatePassword.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updatePassword.fulfilled, (state) => {
            state.loading = false;
            state.isUpdated = true;
            
        });
        builder.addCase(updatePassword.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
        builder.addCase(updateProfile.pending, (state) => {
            state.loading = true;
            state.isUpdated = false;
        });
        builder.addCase(updateProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.user = {...action.payload.user};
            state.isUpdated = true;
        });
        builder.addCase(updateProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
        builder.addCase(forgotPassword.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(forgotPassword.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
        });
        builder.addCase(forgotPassword.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
        builder.addCase(resetPassword.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(resetPassword.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
        });
        builder.addCase(resetPassword.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    }
});
export const { clearError, clearMessage } = userSlice.actions;

export default userSlice.reducer;