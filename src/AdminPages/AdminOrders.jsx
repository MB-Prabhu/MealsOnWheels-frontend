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