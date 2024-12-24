import React, { useContext, useEffect } from 'react'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'

const ADminProtectedRoutes = ({children}) => {
    const {setshowAdminLogin} = useContext(StoreContext)

    let navigate = useNavigate()

    useEffect(() => {
      const admintokenvalue = localStorage.getItem('admintoken');
  
      if (!admintokenvalue) {
        setshowAdminLogin(true); 
        navigate('/'); 
      }
    }, [setshowAdminLogin, navigate]);
  
    const admintokenvalue = localStorage.getItem('admintoken');
    if (!admintokenvalue) {
      return null; 
    }
  return (
        children
  )
}

export default ADminProtectedRoutes