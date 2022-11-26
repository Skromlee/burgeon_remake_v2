// react-toastify
import { toast } from "react-toastify";
// formik
import { useFormik } from "formik";
import { signInSchema } from "../schemas";
// icons from react-icons
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// material ui
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
// userSlice
import { reset, userSignin } from "../features/auth/authSlice";
import { useEffect } from "react";
import { Backdrop, CircularProgress } from "@mui/material";

const Signup = () => {
    // Dispatch and Navigate
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess || user) {
            navigate("/user/home");
        }

        return () => {
            dispatch(reset());
        };
    }, [user, isError, isSuccess, message, navigate, dispatch]);

    const onSubmit = (values, actions) => {
        // Dispatch to userSignIn
        dispatch(userSignin(values));
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
                    <h1 className="text-4xl md:text-5xl font-bold">Sign In</h1>
                    <p>
                        Doesn't have an account?{" "}
                        <span className="text-brightRed hover:cursor-pointer">
                            <a href="/signup">Signup</a>
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
export default Signup;
