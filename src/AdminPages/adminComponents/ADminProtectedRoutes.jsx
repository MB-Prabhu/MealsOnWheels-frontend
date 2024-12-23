import React, { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'

const ADminProtectedRoutes = ({children}) => {
    const {token, setshowAdminLogin} = useContext(StoreContext)

    let navigate = useNavigate()

    let admintokenvalue = localStorage.getItem("admintoken")

    if(!admintokenvalue){
        setshowAdminLogin(true)
        navigate('/')
        return false;
    }

  return (
        children
  )
}

export default ADminProtectedRoutes