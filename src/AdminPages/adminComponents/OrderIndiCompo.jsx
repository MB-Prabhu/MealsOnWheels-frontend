import React, { useContext, useState } from 'react'
import { Button, MenuItem, Select } from '@mui/material';
import { assets } from '../../assets/assets/frontend_assets/assets';
import axios  from 'axios';
import { StoreContext } from '../../context/StoreContext';
import { toast } from 'react-toastify';

const OrderIndiCompo = ({ele}) => {
  const {apiUrl} = useContext(StoreContext)

  const [foodStatus, setFoodStatus] = useState("")


    let updateFoodStatus= async(_id)=>{

      if(!foodStatus){
        return toast.error("select status before updating the status", {
          autoClose: 1000
        })
      }

        try{
        let {data} = await axios.patch(`${apiUrl}/api/updateorderstatus`, {foodStatus, _id})
          if(data.ok){
             setFoodStatus(data.data.status)
             toast.success(data.msg, {
              autoClose: 2000
             })
          }
        }
        catch(err){
          if(err.response.data?.msg.startsWith("Operation") || err.response.data?.msg.startsWith("connect") || err.response.data?.msg.startsWith("read")){
            toast.warning("please try again")
          }
          else{
            toast.warning(err.response.data?.msg,  {
              autoClose: 1000
            })
          }
        }
      }
    
      

  return (
    <>
        <div key={ele._id} className='w-full gap-4 grid lg:grid-cols-5 border-2 px-4 border-[#676767] sm:grid-cols-2 py-2 sm:py-0 items-center place-items-center md:gap-4 sm:gap-2'>
                          <div>
                            <img src={assets.parcel_icon} alt="" className='lg:size-28 sm:size-28  size-32' />
                          </div>
        
                          <div className='lg:w-[111%] lg:h-[80%] sm:w-[100%] sm:h-[70%] sm:px-0 px-4 '>
                            <p className='text-lg font-semibold'>Ordered Items</p>
                            <div className='lg:w-[100%] lg:h-[80%] sm:w-[100%] sm:h-[70%] overflow-y-scroll flex-wrap flex  py-2 custom-menu'>
                            
                            {ele.items.length>0 && ele.items.map((ele, idx)=>{
        
                                return (
                                  <div key={ele._id}>
                                    <p>{ele.name}x{ele.quantity},</p>
                                  </div>
                                )
                            })}
        
                            
                          </div>
                          </div>
                          
        
                          <div className='flex flex-col sm:px-0 px-4'>
                          <p className='text-lg'><strong>Name:</strong> {ele?.address?.Name || "Not Mentioned"}</p>
                          <p className='text-lg'><span className='font-bold mr-[4px] sm:block'>Address: </span><span className=' text-lg custom-menu lg:w-[90%] overflow-y-scroll leading-6'>{ele?.address?.address || "Not Mentioned"}</span></p>
                          <p><strong>Amount:</strong> ${ele.amount || 0}</p>
                          </div>
                          <Select
                              value={foodStatus ? foodStatus : ele.status}
                              inputProps={{ 'aria-label': 'Without label' }}
                              sx={{width:{sm:"90%", md:"100%",}, height:{lg:"30%",md:"40%", sm:"50%"}, color:"black"}}
                              onChange={(e)=> setFoodStatus(e.target.value)} name="foodStatus"
                              color='info'
                              required
                              variant="outlined"
                            >
        
                              <MenuItem value="Food processing">Food processing</MenuItem>
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
    </>
  )
}

export default OrderIndiCompo