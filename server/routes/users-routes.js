const express = require('express')
const User = require('../models/User');
const Bookings = require('../models/Bookings')
const bcryptjs = require('bcryptjs')

const userRouter = express.Router()

// Get the User Data
userRouter.get("/",async(req,res, next)=> {
    let users;
    try{
        users = await User.find()
    } catch (err){
        return console.log(err)
    }
    if(!users){
        return res.status(500).json({message: "Unexpected Error Occured"})
    }
    return res.status(200).json({users})
})

userRouter.get("/:id", async(req,res, next)=> {
    const id = req.params.id
    let user;
    try{
        user = await User.findById(id)
    } catch (err){
        return res.status(500).json({message: "Unexpected Error Occured"}) 
    }
    if(!user){
        return res.status(500).json({message: "User Not Found"})
    }
    return res.status(200).json({user})
})

// Create User
userRouter.post("/signup",async(req,res,next) => {
    const { name, email, password } = req.body;
    if(!name && name.trim()==="" && !email && email.trim()==="" && !password && password.trim()===""){
        return res.status(422).json({message: "Invalid Input"})
    }    
    const hashedPassword = bcryptjs.hashSync(password)

    let user;
    try{
        user = new User({name,email,password: hashedPassword})
        user = await user.save();
    }
    catch(err){
        return next(err)
    }
    if(!user){
        return res.status(500).json({message:"Unexpected Error Occured!"})
    }
    return res.status(201).json({id: user._id})
})

//Update the User
userRouter.put('/:id', async(req,res,next) => {
    const id = req.params.id
    const { name, email, password } = req.body;

    if(!name && name.trim()==="" && !email && email.trim()==="" && !password && password.trim()===""){
        return res.status(422).json({message: "Invalid Input"})
    } 
    const hashedPassword = bcryptjs.hashSync(password)

    let user
    try {
        user = await User.findByIdAndUpdate(id, {name,email,password : hashedPassword})

    } catch (error) {
        return console.log(error)
    }

    if(!user){
        return res.status(500).json({message:"Something went wrong"})
    }
    res.status(200).json({message:"Updated Successfully"})

})

// Delete the User
userRouter.delete("/:id", async(req,res,next)=>{
    const id = req.params.id
    let user
    
    try {
        user = await User.findByIdAndDelete(id)


    } catch (error) {
        return console.log(error)
    }
    if(!user){
        return res.status(500).json({message:"Something went wrong"})
    }
    res.status(200).json({message:"Deleted Successfully"})
})

// Login User
userRouter.post("/login", async(req,res,next) => {
    const { email, password } = req.body;

    if( !email && email.trim()==="" && !password && password.trim()===""){
        return res.status(422).json({message: "Invalid Input"})
    }

    let existingUser;
    try {
        existingUser = await User.findOne({email})

    } catch (error) {
        return console.log(error)
    }

    if(!existingUser){
        return res.status(404).json({message:"Unable to find the User with this ID"})
    }

    const isPasswordCorrect = bcryptjs.compareSync(password, existingUser.password)

    if(!isPasswordCorrect){
        return res.status(400).json({message:"Incorrect Password"})
    }
    res.status(200).json({message:"Login Successfully", id: existingUser._id})
})

//Get User Bookings
userRouter.get("/bookings/:id", getBookingofUser = async(req,res,next) => {
    const id = req.params.id
    let bookings

    try {
        bookings = await Bookings.find({user:id})
        .populate("movie")
        .populate("user")

    } catch (error) {
        return console.log(error)
    }

    if(!bookings){
        return res.status(500).json({message:"Unable to get bookings"})
    }
    res.status(200).json({bookings})
})

module.exports = userRouter