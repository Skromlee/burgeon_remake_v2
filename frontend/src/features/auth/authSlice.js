import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

// Check localStorage
const user = JSON.parse(localStorage.getItem("user"));

// Const initialState for redux
const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

// Register new user
export const userRegister = createAsyncThunk(
    "auth/user/register",
    async (user, thunkAPI) => {
        try {
            // try to register with service to backend
            return await authService.userRegister(user);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Create authSlice

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        //function
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(userRegister.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(userRegister.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(userRegister.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;                                                                                                                                                                      
            });
    },
});
