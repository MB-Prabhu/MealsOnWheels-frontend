import { Button, IconButton } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import  DeleteIcon from '@mui/icons-material/Delete';
const AdminList = () => {

  const apiUrl = import.meta.env.VITE_API_URL
  const [listData, setListData] = useState([])

  const fetchFoodData = async ()=>{
    try{
      let {data} = await axios.get(`${apiUrl}/api/listfood`)
      if(data.ok){
        setListData(data?.data)
      }
    }
    catch(err){
      toast.error(err.response.data.msg)
      console.log(err.response.data)
    }
  }

  const removeFoodItem = async (id)=>{
    try{
      let {data} = await axios.delete(`${apiUrl}/api/removefood/${id}`)
        console.log(data)
      if(data.ok){
        setListData(p=>{
         let remainingItems = p.filter(({_id})=> _id !== data.data._id)
         toast.success(data.msg)
         return remainingItems
        })
      }
    }
    catch(err){
      toast.error(err.response.data.msg)
      console.log(err.response)
    }
  }
  useEffect(()=>{
    fetchFoodData()
  }, [])

  // console.log(listData)



  return (
    <div className='px-2 border border-black w-[100%] sm:w-[70%] lg:w-[75%] xl:w-[80%] overflow-scroll custom-menu'>
        <p className='font-bold text-lg sm:text-2xl py-4 px-4'>Food List</p>

        <table className='border border-black w-full'>
          <thead className='text-center py-7'>
            <tr className='text-center'>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Remove</th>
            </tr>
              </thead>
              <tbody>
                {listData.length>0 && listData.map(({_id, image, name, category, price})=>{
                  return(
                    <tr key={_id} className='text-center w-[20%]'>
                      <td className='border border-black'>
                        <img src={`${apiUrl}/images/${image}`} alt="" className='block mx-auto size-36 rounded-full py-4 px-4' />
                      </td>
                      <td >{name}</td>
                      <td>{category}</td>
                      <td>{price}</td>
                      <td>
                      <IconButton variant="contained" color="error" sx={{backgroundColor:"#e2a6a6"}} onClick={()=> removeFoodItem(_id)} aria-label='delete'>
                        <DeleteIcon />
                      </IconButton>
                      </td>
                    </tr>
                  )
                }
                )
                }
              </tbody>
          
        </table>

    </div>
  )
}

export default AdminList