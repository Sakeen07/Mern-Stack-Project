const mongoose = require("mongoose")

const movieSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,  
    },
    director:{
        type: String
    },
    actors: [{
        type: String,
        required: true
    }],
    releaseDate: {
        type: Date,
        required: true,
    },
    posterUrl:{
        type: String,
        required: true,
    },
    genre:{
        type: String,
    },
    featured:{
        type: Boolean,
    },
    bookings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bookings"
    }],
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
        required: true,
    }
})

module.exports = mongoose.model("Movie", movieSchema)