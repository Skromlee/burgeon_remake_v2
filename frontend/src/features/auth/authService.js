import axios from "axios";
import { authSlice } from "./authSlice";

const USER_API_URL = "/api/users/";

// Register new user

const userRegister = async (userData) => {
    // User axios to POST to USER_API_URL
    const response = await axios.post(USER_API_URL, userData);

    // Check if has response
    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
};

const authService = {
    userRegister,
};

export const { reset } = authSlice.actions;

export default authSlice.reducer;
