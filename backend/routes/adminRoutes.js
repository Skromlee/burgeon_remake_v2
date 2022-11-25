const express = require("express");
const router = express.Router();
const {
    registerAdmin,
    adminSignin,
} = require("../controllers/adminController");

const { adminProtect } = require("../middleware/adminAuthMiddleware");

router.post("/", adminProtect, registerAdmin);
router.post("/login", adminSignin);

module.exports = router;
