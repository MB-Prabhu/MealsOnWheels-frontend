import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../context/StoreContext'
import { assets } from '../../assets/assets/frontend_assets/assets'
import axios  from 'axios';

const MyOrders = () => {
    const {token,setToken, apiUrl} = useContext(StoreContext)

    const [orderData, setOrderData] = useState([])

    let getOrders = async()=>{
       try{
        console.log("loading bro")
        let {data} = await axios.get(`${apiUrl}/user/order/userorders`, {headers: {token}}) 
        console.log(data)
        if(data.ok){
            setOrderData(data.data)
        }
       }
       catch(err){
        console.log(err)
       }
    }

    

    useEffect(()=>{
         token ? token : setToken(localStorage.getItem("usertoken"))
        console.log(token)
        if(token){
            getOrders()
        }
        console.log(orderData)
    }, [])
  return (
    <div className='w-full'>
        <div className='w-[95%] flex justify-center items-center'>
            
           {orderData.length===0 && <div className='w-full text-[#676767] mx-auto sm:min-h-[50vh] min-h-[40vh] text-center place-content-center text-2xl sm:text-3xl font-semibold'>
              Not Ordered Anything yet...
              </div>}

          {orderData.length>0 && 
            ( 
            <>
             <p className='text-xl font-bold sm:text-2xl '>My Orders</p>
            <div className='flex flex-col gap-4 w-full my-3'>
                 {orderData.length>0 && orderData.map((order=>{
                return(
                    <div className='sm:w-[90%] flex gap-3'>
                        <img src={assets.basket_icon} alt="basketicon" className='size-28' />

                        <div className='flex gap-2 w-[40%]'>
                            {order.items.map(({name, quantity},index)=>{
                                return(
                                    <div key={index}>
                                    <p>{name}X{quantity} ,</p>
                                </div>
                                )

                                 // if(index===items.length.-1){
                                //   return(  <div key={index}>
                                //     <p>{name}X{quantity} ,</p>
                                //     </div> )
                                // }
                                // else{
                                //    return ( <div key={index}>
                                //     <p>{name}X{quantity} ,</p>
                                //     </div> )
                                // }

                            })
                        }
                        </div>

                        <p>Amount: ${order.amount}</p>
                        <p>Quantity: {order.quantity}</p>
                        <p>Status: {order.status}</p>
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