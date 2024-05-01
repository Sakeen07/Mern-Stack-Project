import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getAllMovies } from '../../api-helpers/api-helpers'
import MovieItem from './MovieItem'

function Movies() {
  const[movies,setMovies] = useState()
  useEffect(() => {
    getAllMovies().then((data) => setMovies(data.movies))
    .catch(err => console.log(err))
  },[])

  return (
    <Box margin={'auto'} marginTop={4}>
      <Typography margin={'auto'} variant='h4' padding={1} width="30%" bgcolor={"#900C3F"} color="white" textAlign="center">
        All Movies
      </Typography>
      <Box width={"100%"} margin="auto" marginTop={5} display={'flex'} justifyContent="flex-start" flexWrap={"wrap"}>
      { movies && movies.map((movie,index) => 
          <MovieItem 
          id={movie._id} 
          title={movie.title}
          posterUrl={movie.posterUrl}
          releaseDate={movie.releaseDate}
          key={index}/>)}
      </Box>
    </Box>
  )
}

export default Movies