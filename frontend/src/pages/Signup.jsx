import { useFormik } from "formik";
import { signUpSchema } from "../schemas";
// icons from react-icons
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// material ui
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormHelperText,
} from "@mui/material";

const Signup = () => {
    const onSubmit = async (valuse, actions) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        actions.resetForm();
    };

    const formik = useFormik({
        initialValues: {
            email: "",
            confirmemail: "",
            password: "",
            confirmpassword: "",
            citizen: "",
            acceptedTos: false,
        },
        validationSchema: signUpSchema,
        onSubmit,
    });

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
                    <h1 className="text-4xl md:text-5xl font-bold">Sign Up</h1>
                    <p>
                        Already have an account?{" "}
                        <span className="text-brightRed hover:cursor-pointer">
                            <a href="/signin">Login</a>
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
                                type="email"
                                id="confirmemail"
                                name="confirmemail"
                                label="Confirm Email"
                                value={formik.values.confirmemail}
                                onChange={formik.handleChange}
                                error={
                                    formik.touched.confirmemail &&
                                    Boolean(formik.errors.confirmemail)
                                }
                                helperText={
                                    formik.touched.confirmemail &&
                                    formik.errors.confirmemail
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
                            <TextField
                                fullWidth
                                type="password"
                                id="confirmpassword"
                                name="confirmpassword"
                                label="Confirm Password"
                                value={formik.values.confirmpassword}
                                onChange={formik.handleChange}
                                error={
                                    formik.touched.confirmpassword &&
                                    Boolean(formik.errors.confirmpassword)
                                }
                                helperText={
                                    formik.touched.confirmpassword &&
                                    formik.errors.confirmpassword
                                }
                            />
                            <TextField
                                fullWidth
                                type="tel"
                                id="citizen"
                                name="citizen"
                                label="Licence ID Number"
                                value={formik.values.citizen}
                                onChange={formik.handleChange}
                                error={
                                    formik.touched.citizen &&
                                    Boolean(formik.errors.citizen)
                                }
                                helperText={
                                    formik.touched.citizen &&
                                    formik.errors.citizen
                                }
                            />

                            <FormControl
                                required
                                error={formik.errors.acceptedTos}
                                component="fieldset"
                            >
                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                id="acceptedTos"
                                                checked={
                                                    formik.values.acceptedTos
                                                }
                                                onChange={formik.handleChange}
                                                name="acceptedTos"
                                            />
                                        }
                                        label="I accept the terms of service"
                                    />
                                </FormGroup>
                                <FormHelperText>
                                    * Please accept the terms of service
                                </FormHelperText>
                            </FormControl>

                            <Button
                                color="primary"
                                type="submit"
                                fullWidth
                                variant="contained"
                            >
                                Sign Up
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Signup;
