import React, { useContext, useState } from 'react'
import axios  from 'axios';
import { StoreContext } from '../context/StoreContext';
import { useEffect } from 'react';
import { assets } from '../assets/assets/frontend_assets/assets';
import { Button, MenuItem, Select } from '@mui/material';
import LoadingSpinner from '../components/LoadingSpinner';
import { toast } from 'react-toastify';
import OrderIndiCompo from './adminComponents/OrderIndiCompo';

import ArrowForwardIosIcon  from '@mui/icons-material/ArrowForwardIos';
import  ArrowBackIosIcon  from '@mui/icons-material/ArrowBackIos';
const AdminOrders = () => {

  const {apiUrl} = useContext(StoreContext)
  const [orderList, setOrderList] = useState([])
  const [loading, setLoading] = useState(false)
  
    const [limit, setLimit] = useState(10)
      const [hasNext, setHasNext] = useState(false);
        const [page, setPage] = useState(1)

  // const [foodStatus, setFoodStatus] = useState("")


  let handlePageNo = (action)=>{
    if(action === "prev"){
      if(page>1){
        setPage((p)=> p-1)
      }
    }

    if(action === "next"){
      setPage((p)=> p+1)
    }
}
  const getOrdersList = async ()=>{
   try{
    setLoading(true)
    let {data} = await axios.get(`${apiUrl}/api/listorders?page=${page}&limit=${limit}`)
    console.log(data)
    if(data.ok){
      setOrderList(data.data)
      setHasNext(data?.data.length < limit ? true: false)

    }
   }
   catch(err){
    console.log(err.response.data)
     if(err.response.data?.msg.startsWith("Operation" || "read ECONNRESET" || "read ECONNRESET")){
                    toast.warning("please try again")
                  }
                  else{
                    toast.warning(err.response.data?.msg,  {
                      autoClose: 1000
                    })
                  }
   }
   finally{
    setLoading(false)
   }
  }



  useEffect(()=>{
    getOrdersList()
  }, [page])

  // console.log(orderList)

  return (
    <div className='p-4 rounded-lg w-full overflow-scroll custom-menu'>
      <h1 className='text-xl sm:text-2xl lg:text-3xl font-bold text-[#ff7722]'>Orders List</h1>

      {loading && <div className='flex justify-center items-center min-h-[80vh]'><LoadingSpinner />  </div>}

      {!loading && <div className='py-4 w-full flex flex-col gap-4'>
          {orderList.length>0 && orderList.map((ele, index)=>{
            return(
              // <div key={ele._id} className='w-full gap-4 grid lg:grid-cols-5 border-2 border-[#676767] sm:grid-cols-2 py-2 sm:py-0 items-center place-items-center md:gap-4 sm:gap-2'>
              //     <div>
              //       <img src={assets.parcel_icon} alt="" className='lg:size-28 sm:size-28  size-32' />
              //     </div>

              //     <div className='lg:w-[111%] lg:h-[80%] sm:w-[100%] sm:h-[70%] sm:px-0 px-4 '>
              //       <p className='text-lg font-semibold'>Ordered Items</p>
              //       <div className='lg:w-[100%] lg:h-[80%] sm:w-[100%] sm:h-[70%] overflow-y-scroll flex-wrap flex  py-2 custom-menu'>
                    
              //       {ele.items.length>0 && ele.items.map((ele, idx)=>{

              //           return (
              //             <div key={ele._id}>
              //               <p>{ele.name}x{ele.quantity},</p>
              //             </div>
              //           )
              //       })}

                    
              //     </div>
              //     </div>
                  

              //     <div className='flex flex-col sm:px-0 px-4'>
              //     <p className='text-lg'><strong>Name:</strong> {ele?.address?.Name || "Not Mentioned"}</p>
              //     <p className='text-lg'><span className='font-bold mr-[4px] sm:block'>Address: </span><span className=' text-lg custom-menu lg:w-[90%] overflow-y-scroll leading-6'>{ele?.address?.address || "Not Mentioned"}</span></p>
              //     <p><strong>Amount:</strong> ${ele.amount || 0}</p>
              //     </div>

              //     <Select
              //         value={foodStatus ? foodStatus : ele.status}
              //         inputProps={{ 'aria-label': 'Without label' }}
              //         sx={{width:{sm:"90%", md:"100%",}, height:{lg:"30%",md:"40%", sm:"50%"}, color:"black"}}
              //         onChange={(e)=> handleChange(e,index)} name="foodStatus"
              //         color='info'
              //         variant="outlined"
              //       >

              //         <MenuItem value="Food Processing">Food Processing</MenuItem>
              //         <MenuItem value="Out For delivery">Out For delivery</MenuItem>
              //         <MenuItem value="Delivered">Delivered</MenuItem>
              //       </Select>

              //         <div className=''>
              //         <Button variant="contained" color="warning" onClick={()=> updateFoodStatus(ele._id)}   
              //       sx={{width:{sm:"100%", md:"100%"}, placeItems:"center", height:{lg:"30%", sm:"70%"}, color:"black"}}>
              //           Update Status
              //       </Button>
              //         </div>
                    
              // </div>
              <OrderIndiCompo key={ele._id} ele={ele} />
            )
          })}
      </div>}

      {!loading &&  orderList.length>0 && <div className=' my-4 flex justify-center items-center w-[100%]' >
          <div className=' flex gap-2 '>
          <button 
          className={`border-none sm:py-2 sm:px-2 py-1 px-1 cursor-pointer  ${page<2? "active:bg-[#e29750]" : "active:bg-[#ea9b51]"} text-lg ${page<2 ? "bg-[#e29750]" : "bg-[#eb7a11]"} rounded-lg`}
                onClick={()=> handlePageNo('prev')}
                disabled={page<2}> 
                  <ArrowBackIosIcon />
                 Prev
                </button>

                <button 
                   className={`border-none sm:py-2 sm:px-2 py-1 px-1 cursor-pointer  ${hasNext? "active:bg-[#e29750]" : "active:bg-[#ea9b51]"} text-lg ${hasNext ? "bg-[#e29750]" : "bg-[#eb7a11]"} rounded-lg`}
                onClick={()=> handlePageNo("next")}
                disabled={hasNext}
                >
                Next
                <ArrowForwardIosIcon />
                </button>
          </div>
               
        </div>}

      {/* <LoadingSpinner /> */}
    </div>
  )
}

export default AdminOrders