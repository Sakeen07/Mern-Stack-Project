const express = require("express")
const bcrypt = require("bcryptjs")
const Admin = require("../models/Admin")
const jwt = require("jsonwebtoken")

const adminRouter = express.Router()

// Create Admin

adminRouter.post("/signup", async(req,res,next) => {
    const { email,password } = req.body

    if( !email && email.trim()==="" && !password && password.trim()===""){
        return res.status(422).json({message: "Invalid Input"})
    }

    let existingAdmin

    try {
        existingAdmin = await Admin.findOne({email})

    } catch (error) {
        return console.log(error)
    }
    if(existingAdmin){
        return res.status(400).json({message : "Admin already exists"})
    }

    let admin
    const hashedPassword = bcrypt.hashSync(password)

    try {
        admin = new Admin({email,password:hashedPassword})
        admin = await admin.save()


    } catch (error) {
        return console.log(error)
    }

    if(!admin){
        return res.status(500).json({message:"Unable to store admin"})
    }
    return res.status(201).json({admin})
})

//Login Admin

adminRouter.post("/login", async(req,res,next) => {
    const { email,password } = req.body

    if( !email && email.trim()==="" && !password && password.trim()===""){
        return res.status(422).json({message: "Invalid Input"})
    }
    let existingAdmin
    try {
        existingAdmin = await Admin.findOne({email})

    } catch (error) {
        return console.log(error)
    }
    if(!existingAdmin){
        return res.status(400).json({message:"Admin not found"})
    }
    const isPasswordCorrect = bcrypt.compareSync(password, existingAdmin.password)

    if(!isPasswordCorrect){
        return res.status(400).json({message:"Incorrect Password"})   
    }

    const token = jwt.sign({id: existingAdmin._id}, process.env.SECRET_KEY, {
        expiresIn : "7d",

    })

    return res.status(200).json({message:"Login Successfully!",token,id:existingAdmin._id})
})

//Get all Admins Details
adminRouter.get("/", async(req,res,next) => {
    let admins

    try {
        admins = await Admin.find()

    } catch (error) {
        return console.log(error)
    }
    if(!admins){
        return res.status(500).json({message:"Internal Server Error"})
    }

    return res.status(200).json({admins})
})

//Get Admin By ID
adminRouter.get('/:id', async (req, res, next) => {
    const id = req.params.id;
  
    let admin;
    try {
      admin = await Admin.findById(id).populate("addedMovies");
    } catch (err) {
      return console.log(err);
    }
    if (!admin) {
      return console.log("Cannot find Admin");
    }
    return res.status(200).json({ admin });
  })

module.exports = adminRouter