import React, { useContext, useEffect } from 'react'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'

const ADminProtectedRoutes = ({children}) => {
    const {token, setshowAdminLogin} = useContext(StoreContext)

    let navigate = useNavigate()

    // let admintokenvalue = localStorage.getItem("admintoken")

    // if(!admintokenvalue){
    //     setshowAdminLogin(true)
    //     navigate('/')
    //     return false;
    // }


    useEffect(() => {
      const admintokenvalue = localStorage.getItem('admintoken');
  
      if (!admintokenvalue) {
        setshowAdminLogin(true); // Show the admin login modal
        navigate('/'); // Redirect to the home page
      }
    }, [setshowAdminLogin, navigate]);
  
    const admintokenvalue = localStorage.getItem('admintoken');
    if (!admintokenvalue) {
      return null; // Render nothing until redirection is complete
    }
  return (
        children
  )
}

export default ADminProtectedRoutes