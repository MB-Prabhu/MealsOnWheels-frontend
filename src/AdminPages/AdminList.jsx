import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

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

  useEffect(()=>{
    fetchFoodData()
  }, [])
  // console.log(listData)
  return (
    <div>AdminList</div>
  )
}

export default AdminList