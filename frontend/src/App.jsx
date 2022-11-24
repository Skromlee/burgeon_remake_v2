import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Home Layout Pages
import HomeLayout from "./layouts/HomeLayout";
import Home from "./pages/Home";

// No Layout Pages
import Signin from "./pages/Singin";
import Signup from "./pages/Signup";
import AdminSignIn from "./pages/admin/AdminSignIn";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route element={<HomeLayout />}>
                    <Route path="/" element={<Home />} />
                </Route>
                {/* No Layout Pages */}
                <Route path="/signin" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/admin/" element={<AdminSignIn />} />
            </Routes>
        </Router>
    );
};
export default App;
