const mongoose = require("mongoose");

const adminSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, "Please add an email"],
            unique: true,
        },
        password: {
            type: String,
            require: [true, "Please add a password"],
        },
        role: {
            type: String,
            required: [true, "Please add a role"],
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Admin", adminSchema);
