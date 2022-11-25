import { useFormik } from "formik";
import { signInSchema } from "../../schemas";
import { useEffect } from "react";
// react-toastify
import { toast } from "react-toastify";
// icons from react-icons
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// material ui
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
// adminSlice
import { adminSignin, reset } from "../../features/auth/authSlice";
import { Backdrop, CircularProgress } from "@mui/material";

const AdminSignIn = () => {
    // Dispatch and Navigate
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { admin, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess || admin) {
            navigate("/admin/home");
        }

        return () => {
            dispatch(reset());
        };
    }, [admin, isError, isSuccess, message, navigate, dispatch]);

    const onSubmit = async (values, actions) => {
        // Admin SignIn Dispatch
        dispatch(adminSignin(values));
        actions.resetForm();
    };

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: signInSchema,
        onSubmit,
    });

    if (isLoading) {
        return (
            <Backdrop
                sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={true}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        );
    }

    return (
        <>
            <div>
                <div className="p-6 px-12 flex justify-between">
                    <a href="/">
                        <img
                            src="/logo/Burgeon.svg"
                            className="max-h-14"
                            alt="Burgeon LOGO"
                        />
                    </a>
                    <a href="/">
                        <AiOutlineClose size={30} />
                    </a>
                </div>
                <div className="space-y-6 flex flex-col items-center container justify-center h-[calc(100vh-173px)] mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold">
                        Admin Section
                    </h1>
                    <p>
                        Not an admin?{" "}
                        <span className="text-brightRed hover:cursor-pointer">
                            <a href="/signin">Sign in</a>
                        </span>
                    </p>
                    <div className="flex flex-col w-3/6">
                        <form
                            onSubmit={formik.handleSubmit}
                            className="space-y-4"
                        >
                            <TextField
                                fullWidth
                                type="email"
                                id="email"
                                name="email"
                                label="Email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                error={
                                    formik.touched.email &&
                                    Boolean(formik.errors.email)
                                }
                                helperText={
                                    formik.touched.email && formik.errors.email
                                }
                            />
                            <TextField
                                fullWidth
                                type="password"
                                id="password"
                                name="password"
                                label="Password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                error={
                                    formik.touched.password &&
                                    Boolean(formik.errors.password)
                                }
                                helperText={
                                    formik.touched.password &&
                                    formik.errors.password
                                }
                            />
                            <Button
                                color="primary"
                                type="submit"
                                fullWidth
                                variant="contained"
                                className={
                                    isLoading ? "opacity-30 transition" : null
                                }
                            >
                                Sign In
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};
export default AdminSignIn;
