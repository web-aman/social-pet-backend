const mongoose = require("mongoose");

const breedSchema = new mongoose.Schema(
    {
        petCategory: {
            type: mongoose.Schema.Types.ObjectId
        },
        petBreads: {
            type: String
        },
        isDeleted: {
            type : Boolean,
            default : false
        },
        uploadedBy: {
            type: mongoose.Schema.Types.ObjectId
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Breed", breedSchema);