import React, { Fragment, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import {Box} from '@mui/system'
import { getMovieDetails, newBooking } from '../../api-helpers/api-helpers'
import { Button, FormLabel, TextField, Typography } from '@mui/material'

function Booking() {
    const navigate = useNavigate()
    const [movie , setMovie] = useState()
    const [inputs, setInputs] = useState({seatNumber: "", date: ""})
    const id = useParams().id
    console.log(id)

    useEffect(() => {
        getMovieDetails(id)
        .then((res) => setMovie(res.movie))
        .catch((err) => console.log(err))
    },[id])

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))}

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(inputs)
        newBooking({ ...inputs,
            movie:movie._id })
        .then((res) =>{
            console.log(res)
            navigate("/user")
    })
        .catch((err) => console.log(err))

    }

    const currentDate = new Date().toISOString().split('T')[0];

    return (
    <div>
        {movie && ( 
        <Fragment>
            <Typography padding={3} fontFamily="fantasy" variant='h4' textAlign={"center"}>
                Book Tickets Of Movie : {movie.title}
            </Typography>
            <Box display={"flex"} justifyContent={"center"}>
                <Box display={'flex'} justifyContent={'column'} flexDirection={'column'} paddingTop={3} width="50%" marginRight={"auto"}> 
                    <img width= "40%" height={"300px"} src={movie.posterUrl} alt={movie.title} style={{marginLeft: "25px"}}></img>
                    <Box width={'80%'} marginTop={3} padding={2}>
                        <Typography paddingTop={2}>
                            {movie.description}
                        </Typography>
                        <Typography fontWeight={'bold'} marginTop={1}>
                            Staring:
                            {movie.actors.map((actor)=> " " + actor + ", ")}
                        </Typography>
                        <Typography fontWeight={'bold'} marginTop={1}>
                            Release Date: {new Date(movie.releaseDate).toDateString()}
                        </Typography>
                    </Box>
                </Box>
                <Box width={'50%'} paddingTop={3}>
                    <form onSubmit={handleSubmit}>
                        <Box padding={5} margin={'auto'} display="flex" flexDirection={"column"}>
                            <FormLabel>
                                Seat Number:
                            </FormLabel>
                            <TextField 
                            value={inputs.seatNumber}
                            onChange={handleChange}
                             name='seatNumber' type={"number"} margin='normal' variant='standard' inputProps={{ min: 1 }}/>

                            <FormLabel>
                                Booking Date:
                            </FormLabel>
                            <TextField value={inputs.date} onChange={handleChange}
                            name='date' type={'date'} margin='normal' variant='standard' inputProps={{ min: currentDate }}/>

                            <Button type='submit' sx={{mt:3}} >
                                Book Now
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Box>
            
        </Fragment>)}
    </div>
  )
}

export default Booking