import axios from "axios";

const USER_API_URL = "/api/users/";
const ADMIN_API_URL = "/api/admins/";

// ---------- ADMIN SECTION ----------
const adminSignin = async (adminData) => {
    // Admin axios to POST to ADMIN_API_URL
    const response = await axios.post(ADMIN_API_URL + "login", adminData);

    if (response.data) {
        localStorage.setItem("admin", JSON.stringify(response.data));
    }

    return response.data;
};

// ---------- ADMIN SECTION ----------
// Register new user
const userSignup = async (userData) => {
    // User axios to POST to USER_API_URL

    const response = await axios.post(USER_API_URL, userData);

    // Check if has response
    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
};

const authService = {
    // ---------- ADMIN SECTION ----------
    adminSignin,
    //  ---------- USER SECTION ----------
    userSignup,
};

export default authService;
