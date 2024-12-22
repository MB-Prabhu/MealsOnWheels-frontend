import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../context/StoreContext'
import { assets } from '../../assets/assets/frontend_assets/assets'
import axios  from 'axios';

const MyOrders = () => {
    const {token,apiUrl} = useContext(StoreContext)

    const [orderData, setOrderData] = useState([])

    let getOrders = async()=>{
       try{
        console.log("loading bro")
        let {data} = await axios.get(`${apiUrl}/user/order/userorders`, {}, {headers:{token}}) 
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
        console.log(token)
        if(token){
            getOrders()
        }
    }, [])
  return (
    <div className='w-full'>
        <div className='w-[95%] flex justify-center items-center'>
            
            <p className='text-xl font-bold sm:text-2xl '>My Orders</p>

            {orderData.map((order=>{
                return(
                    <div className='sm:w-[90%] '>
                        <img src={assets.basket_icon} alt="basketicon" className='size-28' />

                        <div>
                            {order.items.map(({name, quantity})=>(
                                <div>
                                    <p>{name} "X" {quantity}</p>
                                </div>
                            ))}
                        </div>

                        <p>Amount: {order.amount}</p>

                        <p>Status: {order.status}</p>
                    </div>
                )
            }))}
        </div>
    </div>
  )
}

export default MyOrders