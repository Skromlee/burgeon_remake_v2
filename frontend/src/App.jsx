import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// react-toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// No Layout Pages
import Signin from "./pages/Singin";
import Signup from "./pages/Signup";
import AdminSignIn from "./pages/admin/AdminSignIn";

// Home Layout Pages
import HomeLayout from "./layouts/HomeLayout";
import Home from "./pages/Home";

// Admin layout Pages
import AdminLayout from "./layouts/AdminLayout";
import Admin from "./pages/admin/Admin";

// User layout Pages
import UserLayout from "./layouts/UserLayout";
import User from "./pages/user/User";

const App = () => {
    return (
        <>
            <Router>
                <Routes>
                    {/* No Layout Pages */}
                    <Route path="/signin" element={<Signin />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/admin/" element={<AdminSignIn />} />

                    {/* Home Layout */}
                    <Route element={<HomeLayout />}>
                        <Route path="/" element={<Home />} />
                    </Route>

                    {/* Admin Layout */}
                    <Route element={<AdminLayout />}>
                        <Route path="/admin/home" element={<Admin />} />
                    </Route>

                    {/* User Layout */}
                    <Route element={<UserLayout />}>
                        <Route path="/user/home" element={<User />} />
                    </Route>
                </Routes>
            </Router>
            <ToastContainer />
        </>
    );
};
export default App;
