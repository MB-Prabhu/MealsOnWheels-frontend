import React, { useContext, useState } from 'react'
import { StoreContext } from '../context/StoreContext'
import { TextField, Button } from '@mui/material';
import CloseIcon  from '@mui/icons-material/Close';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {

  const {isLogin, setIsLogin, setShowLogin, apiUrl, token , setToken} = useContext(StoreContext)

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
      // console.log(userData)



      let endPoint = isLogin ? '/user/loginuser' : '/user/userregister'      
      let finalData = {}
      if(isLogin){
        let {Name, address, confirmPassword, mobile, ...payload} = userData
        console.log(payload)
        finalData = payload
      }
      else{
        finalData = userData
      }

      // try{
        console.log(finalData)
        console.log(apiUrl+endPoint)
        let {data} = await axios.post(`${apiUrl}${endPoint}`, finalData)
        console.log(data)

        if(data.ok){
          setToken(data?.token)
          localStorage.setItem("usertoken", data?.token)
          toast.success(data?.msg, {
            autoClose: 2000
          })
          // setuserData({
          //   Name: "",
          //   mobile: "",
          //   address: "",
          //   email: "",
          //   password: "",
          //   confirmPassword: ""
          // })
        }
        else{
          toast.error(data.msg)
        }
      // }
      // catch(err){
      //   toast.warning(err.response.data?.msg,  {
      //     autoClose: 2000
      //   })
      // }
      // setuserData({
      //   Name: "",
      // mobile: "",
      // address: "",
      // email: "",
      // password: "",
      // confirmPassword: ""
      // })
    }

    let handleLoginSubmit=(e)=>{
      e.preventDefault()

      
      let {Name, address, confirmPassword, mobile, ...payload} = userData
      console.log(payload)
      setuserData({
      email: "",
      password: "",
      })
    }


  return (
    <div className='fixed w-full h-full bg-opacity-50 bg-[#676767] z-30 place-content-center place-items-center' >
      <div 
      // tabIndex={-1} 
      // onBlur={() => setShowLogin(false)}
      // onClick={(e)=> e.stopPropagation()}
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
              sx={{height: "40px"}} />

              <TextField label="Mobile"
              value={userData.mobile}
              onChange={(e)=> handleChange(e)}
              name="mobile" variant="outlined" 
              sx={{height: "40px"}} />

              <TextField label="Address"
              value={userData.address}
              onChange={(e)=> handleChange(e)}
              name="address" variant="outlined" 
              sx={{height: "40px"}} />
              </>
            )}

            <TextField label="Email"
            value={userData.email}
            onChange={(e)=> handleChange(e)}
            name="email" variant="outlined" 
            sx={{height: "40px"}} />

            <TextField label="Password"
              value={userData.password}
            onChange={(e)=> handleChange(e)}
            name="password" variant="outlined" 
            sx={{height: "40px"}} />

      {!isLogin && (
              <>
              <TextField label="Confirm Password"
              onChange={(e)=> handleChange(e)}
              value={userData.confirmPassword}
              name="confirmPassword" variant="outlined" 
              sx={{height: "40px"}} />
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
  )
}

export default Login