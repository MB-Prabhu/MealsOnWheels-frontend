import React, { useContext, useState } from 'react'
import axios  from 'axios';
import { StoreContext } from '../context/StoreContext';
import { useEffect } from 'react';
import { assets } from '../assets/assets/frontend_assets/assets';
import { Button } from '@mui/material';

const AdminOrders = () => {

  const {apiUrl} = useContext(StoreContext)
  const [orderList, setOrderList] = useState([])

  const [foodStatus, setFoodStatus] = useState("")

  const getOrdersList = async ()=>{
   try{
    let {data} = await axios.get(`${apiUrl}/api/listorders`)
    if(data.ok){
      setOrderList(data.data)
    }
   }
   catch(err){
    console.log(err)
   }
  }

  let updateFoodStatus= async(_id)=>{
    try{
    let {data} = await axios.patch(`${apiUrl}/api/updateorderstatus`, {foodStatus, _id})
      if(data.ok){
         setFoodStatus(data.data.status)
      }
      setFoodStatus("")
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
    <div className='p-4 w-full'>
      <h1 className='text-xl sm:text-2xl font-bold'>Orders List</h1>

      <div className='py-4 w-full flex flex-col'>
          {orderList.length>0 && orderList.map((ele, index)=>{
            return(
              <div key={ele._id} className='h-20 w-full'>
                  <div>
                    <img src={assets.parcel_icon} alt="" />
                  </div>

                  <div>
                    {orderList.items.map((ele, idx)=>{
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
                    })}
                  </div>
                  <p className='text-lg'>{ele.address.Name}</p>
                  <p className='text-lg'>{ele.address.address}</p>
                  <p>${ele.amount}</p>
                  <Select
                      value={foodStatus}
                      //  label="Age"
                      // displayEmpty
                      inputProps={{ 'aria-label': 'Without label' }}
                      sx={{width:"100%", color:"black"}}
                      onChange={handleChange} name="foodStatus"
                    >
                      <MenuItem value="Food Processing">Food Processing</MenuItem>
                      <MenuItem value="Out For delivery">Out For delivery</MenuItem>
                      <MenuItem value="Delivered">Delivered</MenuItem>
                    </Select>

                    <Button onClick={()=> updateFoodStatus(ele._id)}>
                        Update Status
                    </Button>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default AdminOrders