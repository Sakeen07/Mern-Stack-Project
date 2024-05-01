const express = require("express")
const jwt = require("jsonwebtoken");
const Movies = require("../models/Movies");
const { default: mongoose } = require("mongoose");
const Admin = require("../models/Admin");
const movieRouter = express.Router();

//Get Movies
movieRouter.get("/", async(req,res,next) => {
    let movies

    try {
        movies = await Movies.find()


    } catch (error) {
        return console.log(error)
    }

    if(!movies){
        return res.status(500).json({message:"Request Failed"})
    }
    return res.status(200).json({movies})
})

//Get Movies by ID
movieRouter.get("/:id", async(req,res,next) => {
    const id = req.params.id
    let movie

    try{
        movie = await Movies.findById(id)
    }
    catch(err){
        return console.log(err)
    }

    if(!movie){
        return res.status(500).json({message:"Request Failed"})
    }
    return res.status(200).json({movie})
})

//Post Movies
movieRouter.post("/", async(req,res,next) => {
    const extractedToken = req.headers.authorization.split(" ")[1] //Bearer token
    if(!extractedToken && extractedToken.trim() === ""){
        return res.status(404).json({message: "Token not found"})
    }

    let adminId

    // verify token
    jwt.verify(extractedToken,process.env.SECRET_KEY, async(err,decrypted) => {
        if(err){
            return res.status(400).json({message: `${err.message}`})
        }
        else{
            adminId = decrypted.id
        }
    })

    // Create a New Movie
    const {title, description, releaseDate, posterUrl, featured, actors, genre} = req.body

    if(
        !title && title.trim() === "" ||
        !description && description.trim() === "" ||
        !releaseDate && releaseDate.trim() === "" ||
        !posterUrl && posterUrl.trim() === ""){

            return res.status(422).json({message: "Invaild Output"})
        }

        let movie
        try {
            movie = new Movies({title,description,releaseDate: new Date(`${releaseDate}`),featured,actors,posterUrl,genre:genre,admin: adminId})

            const session = await mongoose.startSession()
            const adminUser = await Admin.findById(adminId)
            session.startTransaction()
            await movie.save({session})
            adminUser.addedMovies.push(movie)
            await adminUser.save({session})
            await session.commitTransaction()

        } catch (error) {
            return console.log(error)
        }

        if(!movie){
            return res.status(500).json({message:"Request Failed"})
        }
        return res.status(201).json({movie})  
})

module.exports = movieRouter