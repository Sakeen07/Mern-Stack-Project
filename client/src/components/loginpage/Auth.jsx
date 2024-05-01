import React from 'react'
import AuthForm from './AuthForm'
import { sendUserAuthRequest } from '../../api-helpers/api-helpers'
import { useDispatch } from 'react-redux'
import { userActions } from '../../store'
import { useNavigate } from 'react-router'

function Auth() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const onResRecieved = (data) => {
    console.log(data);
    dispatch(userActions.login())
    localStorage.setItem("userId", data.id)
    navigate("/")
  }
  
  const getData = (data) => {
    console.log("Auth", data)
    sendUserAuthRequest(data.inputs, data.signup)
    .then(onResRecieved)
    .catch((err) => console.log(err))
  }

  return (
    <AuthForm onSubmit={getData} isAdmin={false}/>
  )
}

export default Auth