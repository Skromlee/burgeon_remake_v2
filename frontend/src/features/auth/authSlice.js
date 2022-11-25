import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

// Check localStorage
const user = JSON.parse(localStorage.getItem("user"));
const admin = JSON.parse(localStorage.getItem("admin"));

// Const initialState for user
const initialState = {
    user: user ? user : null,
    admin: admin ? admin : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

// ---------- ADMIN SECTION -----------
export const adminSignin = createAsyncThunk(
    "auth/admin/login",
    async (admin, thunkAPI) => {
        try {
            //try to login with service to backend
            return await authService.adminSignin(admin);
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

// ---------- USER SECTION ----------
// Register new user
export const userSignup = createAsyncThunk(
    "auth/user/register",
    async (user, thunkAPI) => {
        console.log(user);
        try {
            // try to register with service to backend
            return await authService.userSignup(user);
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
    initialState: initialState,
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
            // ---------- ADMIN SECTION ----------
            .addCase(adminSignin.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(adminSignin.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.admin = action.payload;
            })
            .addCase(adminSignin.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.admin = null;
            })
            // ---------- USER SECTION ----------
            .addCase(userSignup.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(userSignup.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(userSignup.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            });
    },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
