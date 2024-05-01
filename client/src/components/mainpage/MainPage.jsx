import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Header from './Header'
import Footer from './Footer'
import { Route, Routes } from 'react-router'
import HomePage from '../HomePage'
import Movies from '../movies/Movies'
import Admin from '../loginpage/Admin'
import Auth from '../loginpage/Auth'
import { adminActions, userActions } from '../../store'
import Booking from '../bookingpage/Booking'
import UserProfile from '../profile/UserProfile'
import AddMovies from '../movies/AddMovies'
import AdminProfile from '../profile/AdminProfile'

function Mainpage(is) {
  const dispatch = useDispatch()
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn)
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn)
  console.log("isAdminLoggedIn", isAdminLoggedIn)
  console.log("isUserLoggedIn", isUserLoggedIn)

  // useEffect(() => {
  //   if(!isUserLoggedIn.isLoggedIn && !isAdminLoggedIn.isLoggedIn){
  //     navigate('/auth')
  //   }
  // },[])

  useEffect(() => { 
    if(localStorage.getItem("userId")){
      // also do get user by id from the backend verify it
      dispatch(userActions.login())

    }else if(localStorage.getItem("adminId")){
      // also do get user by id from the backend verify it
      dispatch(adminActions.login())

    }
  }, [dispatch])

  return (
    <div>
      {isAdminLoggedIn && (
        <>
        {""}
        <Header/>
        </>
      )}
      {isUserLoggedIn && (
        <>
        {""}
        <Header/>
        </>
      )}  
        <section>
          <Routes>
            <Route path='/' element={<HomePage/>} isLoggedIn={isUserLoggedIn.isLoggedIn || isAdminLoggedIn.isLoggedIn}/>
            <Route path='/movies' element={<Movies/>}/>

            {!isUserLoggedIn && !isAdminLoggedIn && (
            <>
              {" "}
              <Route path='/admin' element={<Admin/>}/>
            <Route path='/auth' element={<Auth/>}/>
            </>)}

            { isUserLoggedIn && !isAdminLoggedIn && (
            <>
            {" "} 
            <Route path='/booking/:id' element={<Booking/>}/>
            <Route path='/user' element={<UserProfile/>}/>
            </>)}

            { isAdminLoggedIn && !isUserLoggedIn && (
              <>
              {" "}
              <Route path='/add' element={<AddMovies/>}/>
            <Route path='/user-admin' element={<AdminProfile/>}/>
            </>
            )}

          </Routes>
        </section>
        { isAdminLoggedIn && isUserLoggedIn && (  
        <> 
        {" "}
        <Footer/>
        </>
        )}
    </div>
  )
}

export default Mainpage
