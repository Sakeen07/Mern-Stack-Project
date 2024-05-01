import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {AppBar, Toolbar, Autocomplete, TextField, Tabs, Tab, IconButton} from '@mui/material'
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import {Box} from '@mui/system'
import { getAllMovies } from '../../api-helpers/api-helpers';
import { Link, useNavigate } from 'react-router-dom';
import { adminActions, userActions } from '../../store';

function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [value, setValue] = useState()
  const [movies, setMovies] = useState([])

  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn)
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn)
  
  useEffect(() => {
    getAllMovies().then((data)=>setMovies(data.movies))
    .catch(err => console.log(err))
  }, [])

  const logout = (isAdmin) => {
    dispatch(isAdmin?adminActions.logout()
    :userActions.logout())
  }

  const handleSearch = (e,value) => {
     const movie = movies.find((m) => m.title === value)
     console.log(movie)
     if(movie && isUserLoggedIn){
      navigate(`/booking/${movie._id}`)
     }
  }

  return (
    <AppBar position='sticky' sx={{bgcolor : "#2d2d42"}}>
      <Toolbar sx={{alignItems:'center'}}>
    
          <IconButton LinkComponent={Link} to="/">
          <MovieCreationIcon sx={{color:"white"}}/>
          </IconButton>
          <Box marginLeft={0.2} LinkComponent={Link} to="/">
          <span style={{ color: "white", fontSize: "1.5rem" }}>iMovies</span>
        </Box>

        <Box width={"30%"} margin={'auto'}>
        <Autocomplete
        onChange={handleSearch}
        freeSolo
        options={movies && movies.map((option) => option.title)}
        renderInput={(params) => <TextField sx={{input: {color:"white"}}}
         variant='standard' {...params} placeholder="Search for the Movie" />}/>
        </Box>
        <Box display={'flex'}>
          <Tabs textColor='inherit' value={value} onChange={(e,val) => setValue(val)}>
            <Tab LinkComponent={Link} to = "/movies" label="Movies" />
            {!isAdminLoggedIn && !isUserLoggedIn && (
              <>
              <Tab LinkComponent={Link} to = "/admin" label="Admin" />
              <Tab LinkComponent={Link} to = "/auth" label="User" />
              </>
            )}

            {isUserLoggedIn && (
              <>
              <Tab LinkComponent={Link} to = "/user" label="Profile" />
              <Tab onClick={()=>logout(false)} LinkComponent={Link} to = "/auth" label="Logout" />
              </>
            )}

            {isAdminLoggedIn && (
              <>
              <Tab LinkComponent={Link} to = "/add" label="Add Movie" />
              <Tab LinkComponent={Link} to = "/user-admin" label="Profile" />
              <Tab onClick={()=>logout(true)} LinkComponent={Link} to = "/admin" label="Logout" />
              </>
            )}
          </Tabs>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header
