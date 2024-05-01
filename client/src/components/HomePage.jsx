import { Box, Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import MovieItem from './movies/MovieItem'
import { Link } from 'react-router-dom'
import {getAllMovies} from '../api-helpers/api-helpers'
import ImageSlider from './mainpage/ImageSlider'
import { useLocation } from 'react-router-dom';


function HomePage(isLoggedIn) {
  const location = useLocation();
  const [key, setKey] = useState(0);
  useEffect(() => {
    // This code will run every time the location changes,
    // triggering a rerender of the component.
    // You can perform any actions here that should occur on location change.
    // For example, updating state or fetching data.

    // Example: Force re-render by updating a state variable
    setKey(prevKey => prevKey + 1);
  }, [location]);
  /*const slides = [
    {url: 'http://localhost:3000/Academy.jpg', title: 'Img1'},
    {url: 'http://localhost:3000/gettyimages.jpg', title: 'Img2'},
    {url: 'http://localhost:3000/movie-poster-collage.jpg', title: 'Img3'}
  ]*/
  const [movies, setMovies] = useState([])
  useEffect(() => {
    getAllMovies().then((data)=>setMovies(data.movies))
    .catch(err => console.log(err))
  },[])

  console.log(movies)
  return (
    <Box width={"100%"} height="100%" margin="auto" marginTop={2} isLoggedIn={isLoggedIn}>
        <Box margin='auto' width="80%" height={"60%"} padding={5}>
            <ImageSlider/>
        </Box>
        <Box padding={5} margin="auto">
            <Typography variant='h4' textAlign={'center'}>
                Latest Releases
            </Typography>
        </Box>
        <Box width={"100%"} margin="auto" marginTop={5} display={'flex'} justifyContent="center" flexWrap={"wrap"} paddingTop={0}>
        { movies && movies.slice(0,4).map((movie,index) => 
            <MovieItem 
            id={movie._id} 
            title={movie.title}
            posterUrl={movie.posterUrl}
            releaseDate={movie.releaseDate}
            key={index}/>)}
        </Box>
        <Box display="flex" padding={5} margin="auto">
          <Button LinkComponent={Link} to="/movies" variant='outlined' sx={{margin:"auto", color: "#2b2d42"}}>
            View All Movies
          </Button>
        </Box>
    </Box>
  )
}

export default HomePage
