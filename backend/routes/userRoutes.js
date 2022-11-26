const express = require("express");
const router = express.Router();
const {
    userSignup,
    userSignin,
    userUpdateInformation,
    getUserDetails,
    // getMe,
    // updateUser,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

// Protect Middleware goes here

router.post("/", userSignup);
router.post("/login", userSignin);
router.put("/:id", protect, userUpdateInformation);
router.get("/", protect, getUserDetails);
// router.get("/me", protect, getMe);
// router.put("/:id", protect, updateUser);

module.exports = router;
