const express = require("express")
const Bookings = require("../models/Bookings")
const Movie = require("../models/Movies")
const User = require("../models/User")
const { default: mongoose } = require("mongoose")

const bookingsRouter = express.Router()

// Add Booking
bookingsRouter.post('/', async(req,res,next) => {
    const {movie, date, seatNumber, user} = req.body

    let existingMovie;
    let existingUser;

    try {
        existingMovie = await Movie.findById(movie)
        existingUser = await User.findById(user)

    } catch (error) {
        return console.log(error)
    }

    if(!existingMovie){
        return res.status(404).json({message:"Movie does not exist"})
    }

    if(!existingUser){
        return res.status(404).json({message:"User does not exists"})
    }

    let booking

    try {
        booking = new Bookings({movie,date: new Date(`${date}`), seatNumber, user})

        const session = await mongoose.startSession()
        session.startTransaction()
        existingUser.bookings.push(booking)
        existingMovie.bookings.push(booking)
        await existingUser.save({session})
        await existingMovie.save({session})
        await booking.save({session})
        session.commitTransaction()

    } catch (error) {
        return console.log(error)
    }

    if(!booking){
        return res.status(500).json({message: "Unable to Create a Booking"})
    }
    return res.status(201).json({booking})
})


//Get Booking
bookingsRouter.get("/:id",async(req,res,next) => {
    const id = req.params.id
    let booking

    try {
        booking = await Bookings.findById(id)

    } catch (error) {
        return console.log(error)
    }

    if(!booking){
        return res.status(500).json({message:"Unexpected Error"})
    }
    return res.status(200).json({booking})
})

// Delete Booking
bookingsRouter.delete("/:id", async(req,res,next) => {
    const id = req.params.id;
    let booking;

    try {
        booking = await Bookings.findByIdAndDelete(id).populate("user movie");
        console.log("Booking after findByIdAndDelete:", booking);

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        // Confirm that user and movie fields are populated
        if (!booking.user || !booking.movie) {
            return res.status(500).json({ message: "User or movie not populated in booking" });
        }

        const session = await mongoose.startSession();
        session.startTransaction();

        await booking.user.bookings.pull(booking);
        await booking.movie.bookings.pull(booking);
        await booking.movie.save({ session });
        await booking.user.save({ session });

        session.commitTransaction();
    } catch (error) {
        console.error("Error in delete route:", error);
        return res.status(500).json({ message: "Unable to delete booking" });
    }

    return res.status(200).json({ message: "Successfully deleted booking" });
});


module.exports = bookingsRouter