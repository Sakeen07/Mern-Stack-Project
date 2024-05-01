const mongoose = require("mongoose")

const adminSchema = new mongoose.Schema({
    email:{
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        minLength: 8,
        required: true
    },
    addedMovies: [{
        type: mongoose.Types.ObjectId,
        ref: "Movie",
    },
    ],
})

module.exports = mongoose.model("Admin", adminSchema)