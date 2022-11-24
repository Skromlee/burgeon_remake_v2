import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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

const App = () => {
    return (
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
            </Routes>
        </Router>
    );
};
export default App;
