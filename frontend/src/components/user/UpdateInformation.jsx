import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import ThaiAddress from "react-thai-address";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";
// Date picker
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userUpdateInformation, reset } from "../../features/auth/authSlice";
import { useEffect } from "react";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 1000,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

const UpdateInformation = ({
    open,
    handleClose,
    data,
    setFieldValue,
    initialValues,
}) => {
    const { isLoading } = useSelector((state) => state.auth);
    const onlyUnique = (value, index, self) => {
        return self.indexOf(value) === index;
    };

    const regex = /^[ก-ฮ]/;

    // search by attribute
    const dummy = ThaiAddress.search({ province: "พิษณุโลก" }, 10);
    // Provinces
    const provinces = ThaiAddress.provinces;
    // Districts
    const districts = ThaiAddress.search({
        province: data.values.province ? data.values.province : null,
    });
    let districtsArr = districts.map((each) => {
        return each.city;
    });
    districtsArr = districtsArr.filter(onlyUnique);
    // subDistrict
    const subDistricts = ThaiAddress.search({
        city: data.values.district ? data.values.district : null,
    });
    let subDistrictsArr = subDistricts.map((each) => each.tumbon);
    subDistrictsArr = subDistrictsArr.filter(onlyUnique);
    // valid
    const isValid = ThaiAddress.verify(
        data.values.subDistrict ? data.values.subDistrict : null,
        data.values.district ? data.values.district : null,
        data.values.province ? data.values.province : null
    );
    let postcode = ThaiAddress.search({
        tumbon: data.values.subDistrict ? data.values.subDistrict : null,
    });
    postcode = postcode.sort();

    let postcodeArr = postcode.map((each) => {
        return each.zipcode;
    });
    postcodeArr = postcodeArr.filter(onlyUnique);

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
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={open}>
                        <Box sx={style}>
                            <div className="flex flex-col space-y-6">
                                <div>
                                    <h1 className="text-brightRed text-2xl">
                                        UPDATE YOUR INFORMATION
                                    </h1>
                                </div>
                                <form
                                    onSubmit={data.handleSubmit}
                                    className="space-y-4"
                                >
                                    <div className="flex space-x-10">
                                        <div className=" w-1/2 space-y-4">
                                            <TextField
                                                fullWidth
                                                type="text"
                                                id="id"
                                                name="id"
                                                label="Customer ID"
                                                value={data.values._id}
                                                disabled={true}
                                            />
                                            <TextField
                                                fullWidth
                                                type="email"
                                                id="email"
                                                name="email"
                                                label="Email"
                                                value={data.values.email}
                                                onChange={data.handleChange}
                                                error={
                                                    data.touched.email &&
                                                    Boolean(data.errors.email)
                                                }
                                                helperText={
                                                    data.touched.email &&
                                                    data.errors.email
                                                }
                                            />
                                            <TextField
                                                fullWidth
                                                type="text"
                                                id="firstname"
                                                name="firstname"
                                                label="Firstname"
                                                value={data.values.firstname}
                                                onChange={data.handleChange}
                                                error={
                                                    data.touched.firstname &&
                                                    Boolean(
                                                        data.errors.firstname
                                                    )
                                                }
                                                helperText={
                                                    data.touched.firstname &&
                                                    data.errors.firstname
                                                }
                                            />
                                            <TextField
                                                fullWidth
                                                type="text"
                                                id="lastname"
                                                name="lastname"
                                                label="Lastname"
                                                value={data.values.lastname}
                                                onChange={data.handleChange}
                                                error={
                                                    data.touched.lastname &&
                                                    Boolean(
                                                        data.errors.lastname
                                                    )
                                                }
                                                helperText={
                                                    data.touched.lastname &&
                                                    data.errors.lastname
                                                }
                                            />
                                            <TextField
                                                fullWidth
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                label="Phone number"
                                                value={data.values.phone}
                                                onChange={data.handleChange}
                                                error={
                                                    data.touched.phone &&
                                                    Boolean(data.errors.phone)
                                                }
                                                helperText={
                                                    data.touched.phone &&
                                                    data.errors.phone
                                                }
                                            />
                                            <TextField
                                                fullWidth
                                                type="tel"
                                                id="citizen"
                                                name="citizen"
                                                label="Licence ID Number"
                                                value={data.values.citizen}
                                                onChange={data.handleChange}
                                                disabled={true}
                                            />
                                        </div>
                                        <div className="w-1/2 space-y-4">
                                            <TextField
                                                fullWidth
                                                type="text"
                                                id="addressNumber"
                                                name="addressNumber"
                                                label="Address Number"
                                                value={
                                                    data.values.addressNumber
                                                }
                                                onChange={data.handleChange}
                                                error={
                                                    data.touched
                                                        .addressNumber &&
                                                    Boolean(
                                                        data.errors
                                                            .addressNumber
                                                    )
                                                }
                                                helperText={
                                                    data.touched
                                                        .addressNumber &&
                                                    data.errors.addressNumber
                                                }
                                            />
                                            <Autocomplete
                                                autoHighlight
                                                onChange={(e, value) =>
                                                    setFieldValue(
                                                        "province",
                                                        value
                                                            ? value
                                                            : initialValues.province
                                                    )
                                                }
                                                style={{
                                                    width: "100%",
                                                }}
                                                options={provinces.sort(
                                                    (a, b) =>
                                                        a.localeCompare(b, "th")
                                                )}
                                                groupBy={(option) => {
                                                    if (!regex.test(option)) {
                                                        return option[1];
                                                    } else {
                                                        return option[0];
                                                    }
                                                }}
                                                getOptionLabel={(option) =>
                                                    option
                                                }
                                                sx={{ width: 300 }}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        label="Province"
                                                        type="text"
                                                        id="province"
                                                        name="province"
                                                        value={
                                                            data.values.province
                                                        }
                                                        error={
                                                            data.touched
                                                                .province &&
                                                            Boolean(
                                                                data.errors
                                                                    .province
                                                            )
                                                        }
                                                        helperText={
                                                            data.touched
                                                                .province &&
                                                            data.errors.province
                                                        }
                                                    />
                                                )}
                                            />
                                            <Autocomplete
                                                autoHighlight
                                                onChange={(e, value) =>
                                                    setFieldValue(
                                                        "district",
                                                        value
                                                            ? value
                                                            : initialValues.district
                                                    )
                                                }
                                                style={{
                                                    width: "100%",
                                                }}
                                                options={districtsArr.sort(
                                                    (a, b) =>
                                                        a.localeCompare(b, "th")
                                                )}
                                                groupBy={(option) => {
                                                    if (!regex.test(option)) {
                                                        return option[1];
                                                    } else {
                                                        return option[0];
                                                    }
                                                }}
                                                getOptionLabel={(option) =>
                                                    option
                                                }
                                                sx={{ width: 300 }}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        label="District"
                                                        type="text"
                                                        id="district"
                                                        name="district"
                                                        value={
                                                            data.values.district
                                                        }
                                                        error={
                                                            data.touched
                                                                .district &&
                                                            Boolean(
                                                                data.errors
                                                                    .district
                                                            )
                                                        }
                                                        helperText={
                                                            data.touched
                                                                .district &&
                                                            data.errors.district
                                                        }
                                                    />
                                                )}
                                            />
                                            <Autocomplete
                                                autoHighlight
                                                onChange={(e, value) =>
                                                    setFieldValue(
                                                        "subDistrict",
                                                        value
                                                            ? value
                                                            : initialValues.subDistrict
                                                    )
                                                }
                                                style={{
                                                    width: "100%",
                                                }}
                                                options={subDistrictsArr.sort(
                                                    (a, b) =>
                                                        a.localeCompare(b, "th")
                                                )}
                                                groupBy={(option) => {
                                                    if (!regex.test(option)) {
                                                        return option[1];
                                                    } else {
                                                        return option[0];
                                                    }
                                                }}
                                                getOptionLabel={(option) =>
                                                    option
                                                }
                                                sx={{ width: 300 }}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        label="Sub District"
                                                        type="text"
                                                        id="subDistrict"
                                                        name="subDistrict"
                                                        value={
                                                            data.values
                                                                .subDistrict
                                                        }
                                                        error={
                                                            data.touched
                                                                .subDistrict &&
                                                            Boolean(
                                                                data.errors
                                                                    .subDistrict
                                                            )
                                                        }
                                                        helperText={
                                                            data.touched
                                                                .subDistrict &&
                                                            data.errors
                                                                .subDistrict
                                                        }
                                                    />
                                                )}
                                            />
                                            <Autocomplete
                                                autoHighlight
                                                onChange={(e, value) =>
                                                    setFieldValue(
                                                        "postcode",
                                                        value
                                                            ? value
                                                            : initialValues.postcode
                                                    )
                                                }
                                                style={{
                                                    width: "100%",
                                                }}
                                                options={postcodeArr.sort()}
                                                // groupBy={(option) => option.zipcode}
                                                getOptionLabel={(option) => {
                                                    return String(option);
                                                }}
                                                sx={{ width: 300 }}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        label="Postcode"
                                                        type="text"
                                                        id="postcode"
                                                        name="postcode"
                                                        value={
                                                            data.values.postcode
                                                        }
                                                        error={
                                                            data.touched
                                                                .postcode &&
                                                            Boolean(
                                                                data.errors
                                                                    .postcode
                                                            )
                                                        }
                                                        helperText={
                                                            data.touched
                                                                .postcode &&
                                                            data.errors.postcode
                                                        }
                                                    />
                                                )}
                                            />
                                            <DesktopDatePicker
                                                id="dateOfBirth"
                                                label="Date Of Birth"
                                                name="dateOfBirth"
                                                inputFormat="DD/MM/YYYY"
                                                value={data.values.dateOfBirth}
                                                onChange={(value) =>
                                                    data.setFieldValue(
                                                        "dateOfBirth",
                                                        value
                                                            ? value
                                                            : initialValues.dateOfBirth
                                                    )
                                                }
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        fullWidth
                                                        variant="outlined"
                                                        error={
                                                            data.touched
                                                                .dateOfBirth &&
                                                            Boolean(
                                                                data.errors
                                                                    .dateOfBirth
                                                            )
                                                        }
                                                        helperText={
                                                            data.touched
                                                                .dateOfBirth &&
                                                            data.errors
                                                                .dateOfBirth
                                                        }
                                                    />
                                                )}
                                            />
                                        </div>
                                    </div>
                                    <Button
                                        color="primary"
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                    >
                                        Update
                                    </Button>
                                </form>
                            </div>
                        </Box>
                    </Fade>
                </Modal>
            </div>
        </LocalizationProvider>
    );
};

export default UpdateInformation;
