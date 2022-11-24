const mongoose = require("mongoose");

const groupSchema = mongoose.Schema(
    {
        totalWeight: Number,
        totalParcels: Number,
        typeofshipment: String,
        typeofstuff: String,
        bagsize: String,
        parcelList: [
            {
                parcelId: mongoose.Schema.Types.ObjectId,
            },
        ],
        branch: mongoose.Schema.Types.ObjectId,
    },
    { timestamps: true }
);

module.exports = mongoose.model("Group", groupSchema);
