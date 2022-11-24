import { Button } from "@mui/material";
import { Link, NavLink, useNavigate } from "react-router-dom";

function Header() {
    const navigate = useNavigate();
    return (
        <nav className="relative container mx-auto p-6">
            <div className="flex items-center justify-between">
                <Link to="/" className="flex items-center space-x-2">
                    <img
                        src="/logo/Burgeon.svg"
                        alt="Burgeon Logo"
                        className="max-h-10"
                    />
                    <h1 className="text-2xl font-medium">BURGEON</h1>
                </Link>

                <div className="hidden space-x-6 md:flex">
                    <NavLink
                        to="/"
                        className={(navData) =>
                            navData.isActive
                                ? `hover:text-gray-500 text-brightRed`
                                : `hover:text-gray-500`
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/search"
                        className={(navData) =>
                            navData.isActive
                                ? `hover:text-gray-500 text-brightRed`
                                : `hover:text-gray-500`
                        }
                    >
                        Parcel Finder
                    </NavLink>
                </div>
                <div className="flex items-center space-x-6">
                    <div className="flex justify-center md:justify-start">
                        <div className="flex items-center space-x-4">
                            <div>
                                <Button
                                    variant="outlined"
                                    onClick={() => navigate("/signin")}
                                    sx={{
                                        borderRadius: 28,
                                        padding: 1.2,
                                        paddingX: 3,
                                    }}
                                >
                                    Login
                                </Button>
                            </div>
                            <Button
                                variant="contained"
                                onClick={() => navigate("/signup")}
                                sx={{
                                    borderRadius: 28,
                                    padding: 1.2,
                                    paddingX: 3,
                                }}
                            >
                                Get Started
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
export default Header;
