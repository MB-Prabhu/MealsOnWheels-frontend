import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../context/StoreContext'
import { assets } from '../../assets/assets/frontend_assets/assets'
import axios  from 'axios';

const MyOrders = () => {
    const {token,setToken, apiUrl} = useContext(StoreContext)

    const [orderData, setOrderData] = useState([])
    let getOrders = async()=>{
       try{
        const token = localStorage.getItem("usertoken");
    if (!token) {
      throw new Error("No token found, please login.");
    }

    console.log("hi well")
    console.log(token)
        let {data} = await axios.get(`${apiUrl}/user/order/userorders`, {headers: {token}}) 
        console.log(data)
        // if(data.ok){
            console.log(data.data)
            setOrderData(data.data)
        // }
        console.log(orderData)
       }
       catch(err){
        console.log(err)
       }
    }

    
    useEffect(()=>{
        // console.log(localStorage.getItem("usertoken"))
        //  token ? token : setToken(localStorage.getItem("usertoken"))
        // console.log(token)
        // if(token){
            getOrders()
        // }
        console.log(orderData)
    }, [])
  return (
    <div className='w-full flex justify-center items-center'>
        <div className='w-[95%] flex flex-col justify-center items-center border border-black'>
            
           {orderData.length===0 && <div className='w-full text-[#676767] mx-auto sm:min-h-[50vh] min-h-[40vh] text-center place-content-center text-2xl sm:text-3xl font-semibold'>
              Not Ordered Anything yet...
              </div>}

          {orderData.length>0 && 
            ( 
            <>
            <div className='w-full'>
             <p className='text-xl font-bold sm:text-2xl lg:text-3xl text-[#261f75]'>My Orders</p>
            </div>
            <div className='flex flex-col items-center gap-4 w-full my-3 min-h-[42vh]'>
                 {orderData.length>0 && orderData.map((order=>{
                return(
                    <div key={order._id} className='sm:w-[90%] rounded-lg sm:px-0 lg:px-0 grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 items-center gap-4 border-2 border-black'>
                        <img src={assets.bag_icon} alt="basketicon" className='sm:size-16' />

                        <div className='flex flex-wrap gap-0 lg:w-[100%] overflow-scroll custom-menu'>
                            {order.items.map(({name, quantity},index)=>{
                                return(
                                <div key={index} className='flex gap-0 text-lg w-[80%] border border-black flex-wrap' >
                                    <p>{name}x{quantity},</p>
                               </div>
                                )
                            })
                        }
                        </div>

                        <p><span className='font-bold lg:text-xl'>Amount:</span> ${order.amount}</p>
                        <p><span className='font-bold lg:text-xl'>Quantity:</span> {order.quantity}</p>
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