import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logOut } from '../../store/authSlice'

function LogoutButton() {

    const dispatch = useDispatch();

    const logoutHandler = () =>{
        authService.logOut().then(()=>{
            dispatch(logOut)
        }).catch();
    }

  return (
    <button onClick={logoutHandler}>
       logout
    </button>
  )
}

export default LogoutButton
