const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const userRouter =  require('./routes/users-routes');
const adminRouter = require('./routes/admin-rotues');
const movieRouter = require('./routes/movie-routes');
const bookingsRouter = require('./routes/booking-routes');
dotenv.config();
const app = express();
app.use(cors({
    origin: 'http://localhost:3000'
}))
app.use(express.json());

// middlewares
app.use('/user', userRouter)
app.use('/admin', adminRouter)
app.use('/movie', movieRouter)
app.use('/bookings', bookingsRouter)


mongoose
    .connect(
     `mongodb+srv://jaleel20211199:${process.env.MONGODB_PASSWORD}@cluster0.hwsxmfi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    )
    .then(()=>
    app.listen(3001, ()=>{
        console.log("Connected to the local host 3001 and the database")
    })
    )
    .catch((e) => console.log(e))