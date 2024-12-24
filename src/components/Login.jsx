import React, { useContext, useState } from 'react'
import { StoreContext } from '../context/StoreContext'
import { TextField, Button } from '@mui/material';
import CloseIcon  from '@mui/icons-material/Close';
import axios from 'axios';
import { toast } from 'react-toastify';
import LoadingSpinner from './LoadingSpinner';

const Login = () => {

  const {isLogin, setIsLogin, setShowLogin, apiUrl, setShowUserLogo, setToken} = useContext(StoreContext)
  const [loading, setLoading] = useState(false)

    const [userData, setuserData] = useState({
      Name: "",
      mobile: "",
      address: "",
      email: "",
      password: "",
      confirmPassword: ""
    })


    let handleChange = ({target: {name, value}})=>{
        setuserData((p)=> ({...p, [name]: value}))
    }

    let handleSignupSubmit=async (e)=>{
      e.preventDefault()
      let endPoint = isLogin ? '/user/userlogin' : '/user/userregister'      
      let finalData = {}
      if(isLogin){
        let {Name, address, confirmPassword, mobile, ...payload} = userData
        finalData = payload
      }
      else{

        if(userData.password !== userData.confirmPassword){
          return toast.error("password and confirm password doesn't match", {
            autoClose: 2000
          })
        }

        if(userData.mobile.length !== 10){
          return toast.error("mobile number should be 10 digits long", {
            autoClose: 2000
          })
        }

        if(!userData.email.includes("@")){
          return toast.error("provide a proper email format", {
            autoClose: 2000
          })
        }

        finalData = userData
      }

      try{
        setLoading(true)
        let {data} = await axios.post(`${apiUrl}${endPoint}`, finalData)
        if(data.ok){
          localStorage.setItem("usertoken", data?.token)
          setToken(localStorage.getItem("usertoken"))
          toast.success(data?.msg, {
            autoClose: 2000
          })
          setuserData({
            Name: "",
            mobile: "",
            address: "",
            email: "",
            password: "",
            confirmPassword: ""
          })
          setShowUserLogo(true)
          setShowLogin(false)
        }
        else{
          toast.error(data.msg)
        }
      }
      catch(err){
          if(err.response.data?.msg.startsWith("connect ETIMEDOUT") || err.response.data?.msg.startsWith("Operation")){
            toast.warning("please try again, server is busy",  {
              autoClose: 2000
            })
          }
          else{
             toast.warning(err.response.data?.msg,  {
            autoClose: 2000
          })
          }
      }
      finally{
        setLoading(false)
      }

    }
  return (
    <>

{loading && (
      <div className='flex w-full absolute h-full z-50 justify-center items-center bg-opacity-50 bg-[#000]'>
        <LoadingSpinner />
      </div>
    )}
     <div className='fixed w-full h-full bg-opacity-50 bg-[#676767] z-30 place-content-center place-items-center' >


      
      <div 
      className={`rounded-lg p-6 w-[60%] sm:w-[50%] lg:w-[40%] xl:w-[30%] bg-[#f7f7f7] relative`} >
        <form action="" onSubmit={handleSignupSubmit} className="flex flex-col gap-3">
          <div className='flex justify-between items-center'>
        <h1 className='text-center text-lg sm:text-2xl font-bold text-orange-400'>{isLogin ? "Login form":"Sigup form"}</h1>
        <p className='cursor-pointer' onClick={()=> setShowLogin(false)}><CloseIcon /></p>
          </div>

            <div className='flex flex-col gap-6'>
            {!isLogin && (
              <>
              <TextField label="Name" 
              value={userData.Name}
              onChange={(e)=> handleChange(e)}
              name="Name" variant="outlined" 
              sx={{height: "40px"}} 
              required />

              <TextField label="Mobile"
              value={userData.mobile}
              onChange={(e)=> handleChange(e)}
              name="mobile" variant="outlined" 
              sx={{height: "40px"}} 
              type="number"
              // slotProps={{
              //   input: {
              //     maxLength: 10,
              //   },
              // }}
              required />

              <TextField label="Address"
              value={userData.address}
              onChange={(e)=> handleChange(e)}
              name="address" variant="outlined" 
              sx={{height: "40px"}} 
              required />
              </>
            )}

            <TextField label="Email"
            value={userData.email}
            onChange={(e)=> handleChange(e)}
            name="email" variant="outlined" 
            sx={{height: "40px"}} 
            type='email'
            required />

            <TextField label="Password"
              value={userData.password}
            onChange={(e)=> handleChange(e)}
            name="password" variant="outlined" 
            type="password"
            sx={{height: "40px"}} 
            required />

      {!isLogin && (
              <>
              <TextField label="Confirm Password"
              onChange={(e)=> handleChange(e)}
              value={userData.confirmPassword}
              name="confirmPassword" variant="outlined" 
              type="password"
              sx={{height: "40px"}} 
              required />
              </>
            )}
            </div>
                
            <Button variant="contained" type="submit" color="success"
            sx={{width: "40%", margin: "20px auto"}}>Submit</Button>
        </form>
        <div className='text-center text-sm'>
        {isLogin ? <p>Not created account yet? <span onClick={()=> setIsLogin(false)} className="text-orange-400 cursor-pointer">create account</span></p> 
            : <p>Already have a account <span onClick={()=> setIsLogin(true)} className="text-orange-400 cursor-pointer">login</span></p>}
        </div>
            
      </div>
   </div>
    </>
   
  )
}

export default Login