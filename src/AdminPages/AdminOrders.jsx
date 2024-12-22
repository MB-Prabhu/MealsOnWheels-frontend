import React, { useContext, useState } from 'react'
import axios  from 'axios';
import { StoreContext } from '../context/StoreContext';
import { useEffect } from 'react';
import { assets } from '../assets/assets/frontend_assets/assets';
import { Button, MenuItem, Select } from '@mui/material';
import LoadingSpinner from '../components/LoadingSpinner';

const AdminOrders = () => {

  const {apiUrl} = useContext(StoreContext)
  const [orderList, setOrderList] = useState([])
  const [loading, setLoading] = useState(false)
  
  const [foodStatus, setFoodStatus] = useState("Food Processing")

  const getOrdersList = async ()=>{
   try{
    setLoading(true)
    let {data} = await axios.get(`${apiUrl}/api/listorders`)
    if(data.ok){
      setOrderList(data.data)
    }
   }
   catch(err){
    console.log(err)
   }
   finally{
    setLoading(false)
   }
  }

  let updateFoodStatus= async(_id)=>{
    try{
    let {data} = await axios.patch(`${apiUrl}/api/updateorderstatus`, {foodStatus, _id})
      if(data.ok){
         setFoodStatus(data.data.status)
      }
      setFoodStatus("Food Processing")
    }
    catch(err){
      console.log(err)

    }
  }

  let handleChange = ({target: {value}})=>{
      setFoodStatus(value)
  }

  useEffect(()=>{
    getOrdersList()
  }, [])

  return (
    <div className='p-4 w-full overflow-scroll custom-menu'>
      <h1 className='text-xl sm:text-2xl lg:text-3xl font-bold text-[#ff7722]'>Orders List</h1>

      {loading && <div className='flex justify-center items-center min-h-[80vh]'><LoadingSpinner />  </div>}

      {!loading && <div className='py-4 w-full flex flex-col gap-4'>
          {orderList.length>0 && orderList.map((ele, index)=>{
            return(
              <div key={ele._id} className='w-full gap-4 grid lg:grid-cols-5 border-2 border-[#676767] sm:grid-cols-2 py-2 sm:py-0 items-center place-items-center md:gap-4 sm:gap-2'>
                  <div>
                    <img src={assets.parcel_icon} alt="" className='lg:size-28 sm:size-28  size-32' />
                  </div>

                  <div className='lg:w-[111%] lg:h-[80%] sm:w-[100%] sm:h-[70%] sm:px-0 px-4 '>
                    <p className='text-lg font-semibold'>Ordered Items</p>
                    <div className='lg:w-[100%] lg:h-[80%] sm:w-[100%] sm:h-[70%] overflow-y-scroll flex-wrap flex  py-2 custom-menu'>
                    
                    {/* {orderList.items?.length>0 && orderList.items.map((ele, idx)=>{
                      if(idx===orderList.length-1){
                        return(
                          <div>
                              <p>{ele.name}X{ele.quantity} ,</p>
                          </div>
                        )
                      }
                      else{
                        return(
                          <div>
                              <p>{ele.name}X{ele.quantity} ,</p>
                          </div>
                        )
                      }
                    })} */}

                    <p>chicken saladX2,</p>
                    <p>chicken saladX2,</p>
                    <p>chicken saladX2,</p>
                    <p>chicken saladX2,</p>
                    <p>chicken saladX2,</p>
                    <p>chicken saladX2,</p>
                    <p>chicken saladX2,</p>
                  </div>
                  </div>
                  

                  <div className='flex flex-col sm:px-0 px-4'>
                  <p className='text-lg'><strong>Name:</strong> {ele?.address?.Name || "Not Mentioned"}</p>
                  <p className='text-lg'><span className='font-bold mr-[4px] sm:block'>Address: </span><span className='border text-lg custom-menu lg:w-[90%] overflow-y-scroll leading-6'>{ele?.address?.address || "Not Mentioned"}</span></p>
                  <p><strong>Amount:</strong> ${ele.amount || 0}</p>
                  </div>

                  <Select
                      value={foodStatus}
                      inputProps={{ 'aria-label': 'Without label' }}
                      sx={{width:{sm:"90%", md:"100%",}, height:{lg:"30%",md:"40%", sm:"50%"}, color:"black"}}
                      onChange={handleChange} name="foodStatus"
                      color='info'
                      variant="outlined"
                    >

                      <MenuItem value="Food Processing">Food Processing</MenuItem>
                      <MenuItem value="Out For delivery">Out For delivery</MenuItem>
                      <MenuItem value="Delivered">Delivered</MenuItem>
                    </Select>

                      <div className=''>
                      <Button variant="contained" color="warning" onClick={()=> updateFoodStatus(ele._id)}   
                    sx={{width:{sm:"100%", md:"100%"}, placeItems:"center", height:{lg:"30%", sm:"70%"}, color:"black"}}>
                        Update Status
                    </Button>
                      </div>
                    
              </div>
            )
          })}
      </div>}

      {/* <LoadingSpinner /> */}
    </div>
  )
}

export default AdminOrders