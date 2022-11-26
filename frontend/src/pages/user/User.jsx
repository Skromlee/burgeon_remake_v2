import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    reset,
    resetLogout,
    userLogout,
    userUpdateInformation,
} from "../../features/auth/authSlice";
import { useFormik } from "formik";
// Import UpdateInformation
import UpdateInformation from "../../components/user/UpdateInformation";
import {
    Autocomplete,
    Backdrop,
    CircularProgress,
    TextField,
} from "@mui/material";
import { updateInformationSchema } from "../../schemas/index.js";
import { ClassNames } from "@emotion/react";

const User = () => {
    // Dispatch and Navigate
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // useState
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        // Update Information Error goes here
        if (!user) {
            navigate("/signin");
        }

        if (isSuccess) {
            handleClose();
        }

        if (user && user.citizen && !user.postcode) {
            handleOpen();
        }
        return () => {
            dispatch(reset());
        };
    }, [user, isError, isSuccess, message, navigate, dispatch]);

    const onSubmit = (values, actions) => {
        console.log(values);
        // Dispatch to userSignIn
        dispatch(userUpdateInformation(values));
        actions.resetForm();
    };

    // formik
    const formik = useFormik({
        initialValues: {
            ...user,
            firstname: "",
            lastname: "",
            phone: "",
            addressNumber: "",
            province: "",
            district: "",
            subDistrict: "",
            postcode: "",
            dateOfBirth: "",
        },
        validationSchema: updateInformationSchema,
        onSubmit,
    });

    const { setFieldValue, initialValues } = formik;

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
            <UpdateInformation
                open={open}
                handleClose={handleClose}
                data={formik}
                setFieldValue={setFieldValue}
                initialValues={initialValues}
            />
            <p
                onClick={() => {
                    dispatch(userLogout());
                    dispatch(resetLogout());
                    navigate("/");
                }}
                className="hover:cursor-pointer"
            >
                Logout
            </p>
        </>
    );
};

export default User;
