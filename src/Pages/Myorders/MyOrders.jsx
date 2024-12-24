import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../context/StoreContext'
import { assets } from '../../assets/assets/frontend_assets/assets'
import axios  from 'axios';

const MyOrders = () => {
    const {apiUrl} = useContext(StoreContext)

    const [orderData, setOrderData] = useState([])
    let getOrders = async()=>{
       try{
        const token = localStorage.getItem("usertoken");
        if (!token) {
        throw new Error("No token found, please login.");
        }
        let {data} = await axios.get(`${apiUrl}/user/order/userorders`, {headers: {token}}) 
        if(data.ok){
            setOrderData(data.data)
        }
       }
       catch(err){
        console.log(err)
          if(err.response.data.msg.startsWith("connect") || err.response.data.msg.startsWith("read") || err.response.data.msg.startsWith("Operation") ){
                    toast.warning("please refresh the page to get the cart items")
                }
            else{
                toast.warning(err.response.data.msg)
            }
       }
    }

    
    useEffect(()=>{
        // console.log(localStorage.getItem("usertoken"))
        //  token ? token : setToken(localStorage.getItem("usertoken"))
        // console.log(token)
        // if(token){
            getOrders()
        // }
    }, [])
  return (
    <div className='w-full flex justify-center items-center my-8'>
        <div className='w-[95%] flex flex-col justify-center items-center '>
            
           {orderData.length===0 && <div className='w-full text-[#676767] mx-auto sm:min-h-[50vh] min-h-[40vh] text-center place-content-center text-2xl sm:text-3xl font-semibold'>
              Not Ordered Anything yet...
              </div>}

          {orderData.length>0 && 
            ( 
            <>
            <div className='w-full'>
             <p className='text-2xl font-bold sm:text-2xl lg:text-3xl text-[#261f75]'>My Orders</p>
            </div>
            <div className='flex flex-col items-center gap-4 w-full my-3 min-h-[42vh]'>
                 {orderData.length>0 && orderData.map((order=>{
                return(
                    <div key={order._id} className='sm:w-[100%] flex flex-col w-[100%] justify-center py-2 rounded-lg sm:px-0 lg:px-0 sm:grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 items-center gap-4 border-2 border-black'>

                        <div className='flex justify-center items-center'>
                        <img src={assets.bag_icon} alt="basketicon" className='sm:size-16' />
                        </div>

                        <div className='flex flex-wrap gap-0 w-[60%] lg:w-[60%]  overflow-scroll custom-menu'>
                            {order.items.map(({name, _id,quantity},index)=>{
                                return(
                                <div key={_id} className='flex gap-0 text-lg w-[80%] flex-wrap' >
                                    <p>{name}x{quantity},</p>
                               </div>
                                )
                            })
                        }
                        </div>

                            <div className=' text-center'>

                        <p><span className='font-bold lg:text-xl'>Amount:</span> ${order.amount}</p>
                            </div>
                        {/* <p><span className='font-bold lg:text-xl'>Quantity:</span> {order.quantity}</p> */}
                        <p><span className='font-bold lg:text-xl'>Status:</span> {order.status}</p>
                    </div>
                )
            }))}
            </div>
           
            </>
            )}
        </div>
    </div>
  )
}

export default MyOrders