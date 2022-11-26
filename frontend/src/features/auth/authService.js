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

// ---------- USER SECTION ----------

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

// Login user
const userSignin = async (userData) => {
    // User axios to POST to USER_API_URL/login

    const response = await axios.post(USER_API_URL + "login", userData);

    // Check if has response
    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
};

// User update information
const userUpdateInformation = async (userData, token) => {
    // User axios to PUT to USER_API_URL
    console.log("Service");
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.put(
        USER_API_URL + userData._id,
        userData,
        config
    );

    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    console.log(response);
    console.log("----------");
    console.log(response.data);
    return response.data;
};

// User Loggout
const userLogout = async () => {
    localStorage.removeItem("user");
};

const authService = {
    // ---------- ADMIN SECTION ----------
    adminSignin,
    //  ---------- USER SECTION ----------
    userSignup,
    userSignin,
    userUpdateInformation,
    userLogout,
};

export default authService;
