import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { StoreContext } from '../context/StoreContext'
import { TextField, Button } from '@mui/material';
import CloseIcon  from '@mui/icons-material/Close';
import  axios  from 'axios';

const AdminLogin = () => {

     const { setshowAdminLogin, apiUrl, setToken} = useContext(StoreContext)
      const [loading, setLoading] = useState(false)
    
        const [adminData, setAdminData] = useState({
          email: "",
          password: "",
  
        })

        let navigate = useNavigate()
    
        let handleChange = ({target: {name, value}})=>{
            setAdminData((p)=> ({...p, [name]: value}))
        }

        let handleAdminLogin=async (e)=>{
            e.preventDefault()
            try{
              setLoading(true)
              let {data} = await axios.post(`${apiUrl}/api/adminlogin`, adminData)
      
              if(data.ok){
                localStorage.setItem("admintoken", data?.token)
                setToken(localStorage.getItem("admintoken"))
                toast.success(data?.msg, {
                  autoClose: 2000
                })
                setAdminData({
                    email: "",
                    password: "",
                  })
                  setshowAdminLogin(false)
                navigate("/adminhome")
              }
              else{
                toast.error(data.msg)
              }
            }
            catch(err){
                if(err.message==="Network Error"){
                    toast.warning(err.message+" please try again")
                }
                else{

                    if(err.response.data?.msg.startsWith("connect")){
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
             
            }
            finally{
              setLoading(false)
            }
      
          }

          let handleCloseAdminLogin = ()=>{
            setshowAdminLogin(false)
          }
      

  return (
    <div className='fixed w-full h-full bg-opacity-50 bg-[#676767] z-30 place-content-center place-items-center' >
        {loading}
    <div 
    className={`rounded-lg p-6 w-[60%] sm:w-[50%] lg:w-[40%] xl:w-[30%] bg-[#f7f7f7] relative`} >
      <form action="" onSubmit={handleAdminLogin} className="flex flex-col gap-3">
        <div className='flex justify-between items-center'>
      <h1 className='text-center text-lg sm:text-2xl font-bold text-orange-400'>Admin Login Form</h1>
      <p className='cursor-pointer' onClick={handleCloseAdminLogin}><CloseIcon /></p>
        </div>

          <div className='flex flex-col gap-6'>
          <TextField label="Email"
          value={adminData.email}
          onChange={(e)=> handleChange(e)}
          name="email" variant="outlined" 
          sx={{height: "40px"}}
          type="email" />

          <TextField label="Password"
            value={adminData.password}
          onChange={(e)=> handleChange(e)}
          name="password" variant="outlined" 
          sx={{height: "40px"}} 
          type='password'/>

   
          </div>
              
          <Button variant="contained" type="submit" color="success"
          sx={{width: "40%", margin: "20px auto"}}>Submit</Button>
      </form>
    </div>
 </div>
  )
}

export default AdminLogin