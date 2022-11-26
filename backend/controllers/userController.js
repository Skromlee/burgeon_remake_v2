const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

// @desc Register new user
// @route POST /api/users
// @access Public
const userSignup = asyncHandler(async (req, res) => {
    console.log(req.body);
    const { email, confirmemail, password, confirmpassword, citizen } =
        req.body;

    if (!email || !confirmemail || !password || !confirmpassword || !citizen) {
        res.status(400);
        throw new Error(
            "Please make sure you already added all required fields"
        );
    }
    //Check if user exists
    const userExistsByEmail = await User.findOne({ email });
    const userExistsByCitizen = await User.findOne({ citizen });
    if (userExistsByEmail) {
        res.status(400);
        throw new Error("User already exists by email.");
    }
    if (userExistsByCitizen) {
        res.status(400);
        throw new Error("User already exists by Licence ID Number.");
    }
    // Hash password goes here
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Create user
    const user = await User.create({
        email,
        password: hashedPassword,
        citizen,
    });
    if (user) {
        res.status(201).json({
            _id: user.id,
            email: user.email,
            citizen: user.citizen,
            token: generateToken(user._id),
            firstname: user.firstname,
            lastname: user.lastname,
            phone: user.phone,
            addressNumber: user.addressNumber,
            province: user.province,
            district: user.district,
            subDistrict: user.subDistrict,
            postcode: user.postcode,
            dateOfBirth: user.dateOfBirth,
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});

// @desc User Signin
// @route POST /api/users/login
// @access Public
const userSignin = asyncHandler(async (req, res) => {
    console.log("Login Trigget in backend");
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            email: user.email,
            citizen: user.citizen,
            token: generateToken(user._id),
            firstname: user.firstname,
            lastname: user.lastname,
            phone: user.phone,
            addressNumber: user.addressNumber,
            province: user.province,
            district: user.district,
            subDistrict: user.subDistrict,
            postcode: user.postcode,
            dateOfBirth: user.dateOfBirth,
        });
    } else {
        res.status(400);
        throw new Error("Incorrect email address or password");
    }
});

// @desc Update a user details
// @route PUT /api/users/
// @access Private
const userUpdateInformation = asyncHandler(async (req, res) => {
    console.log(req.body);
    const targetUser = await User.findById(req.params.id);
    console.log(targetUser);

    if (!targetUser) {
        res.status(400);
        throw new Error("Target user not found");
    }

    if (targetUser._id.toString() !== req.user.id) {
        res.status(401);
        throw new Error("User not authorized");
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    }).select("-password");
    console.log(updatedUser);
    res.status(200).json({
        ...updatedUser._doc,
        token: generateToken(updatedUser._id),
    });
});

// @desc Get user data
// @route GET /api/users/me
// @access Private
const getUserDetails = asyncHandler(async (req, res) => {
    const userDetail = User.find({ _id: req.user.id });

    res.status(200).json({
        ...userDetail,
        token: generateToken(userDetail._id),
    });
});

// // @desc Get user data
// // @route GET /api/users/me
// // @access Private
// const getMe = asyncHandler(async (req, res) => {
//     res.status(200).json(req.user);
// });

// // @desc Update a user information
// // @route PUT /api/users/:id
// // @access Private
// const updateUser = asyncHandler(async (req, res) => {
//     const user = await User.findById(req.params.id);

//     if (!user) {
//         res.status(400);
//         throw new Error("User not found");
//     }

//     const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
//         new: true,
//     }).select("-password");

//     res.status(200).json(updatedUser);
// });

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};

module.exports = {
    userSignup,
    userSignin,
    userUpdateInformation,
    getUserDetails,
    // getMe,
    // updateUser,
};
