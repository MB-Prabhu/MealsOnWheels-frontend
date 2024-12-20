import React, { useState } from 'react'

const AdminList = () => {
  let api_url = import.meta.nv.VITE_API_URL

  const [listData, setListData] = useState([])

  const fetchFoodData = async ()=>{
    try{
      let {data} = await axios.get(`${api_url}/`)
    }
    catch(err){
      console.log(err.response.data.msg)
    }
  }
  return (
    <div>AdminList</div>
  )
}

export default AdminList