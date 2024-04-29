const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
    {
        category: {
            type: String
        },
        isDeleted: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Category", categorySchema);