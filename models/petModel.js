const mongoose = require("mongoose");

const petSchema = new mongoose.Schema(
    {
        petName: {
            type: String
        },
        petCategory: {
            type: mongoose.Schema.Types.ObjectId
        },
        petBreads: {
            type: String
        },
        age: {
            type: Number
        },
        gender: {
            type: String
        },
        dob: {
            type: Date
        },
        location: {
            type: String
        },
        isDeleted: {
            type: Boolean,
            default: false
        },
        address: {
            type: String,
        },
        aboutPets: {
            type: String
        },
        petProfile: {
            type: String
        },
        uploadedBy: {
            type: mongoose.Schema.Types.ObjectId
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Pet", petSchema);