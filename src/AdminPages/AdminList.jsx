import { Button, IconButton } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import  DeleteIcon from '@mui/icons-material/Delete';
import LoadingSpinner from '../components/LoadingSpinner';

import ArrowForwardIosIcon  from '@mui/icons-material/ArrowForwardIos';
import  ArrowBackIosIcon  from '@mui/icons-material/ArrowBackIos';
const AdminList = () => {

  const apiUrl = import.meta.env.VITE_API_URL
  const [listData, setListData] = useState([])
  const [loading, setLoading] = useState(false)
      const [limit, setLimit] = useState(10)
    const [hasNext, setHasNext] = useState(false);
      const [page, setPage] = useState(1)
  

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

  const fetchFoodData = async ()=>{
    try{
      setLoading(true)
      let {data} = await axios.get(`${apiUrl}/api/listfood?page=${page}&limit=${limit}`)
      if(data.ok){
        setListData(data?.data)
        setHasNext(data?.data.length < limit ? true: false)
      }
    }
    catch(err){
      if(err.response.data?.msg.startsWith("Operation")){
        toast.warning("please try again")
      }
      else{
        toast.warning(err.response.data?.msg,  {
          autoClose: 1000
        })
      }
      console.log(err.response.data)
    }
    finally{
      setLoading(false)
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
       if(err.response.data?.msg.startsWith("Operation")){
                toast.warning("please try again")
              }
              else{
                toast.warning(err.response.data?.msg,  {
                  autoClose: 1000
                })
              }
    }
  }
  useEffect(()=>{
    fetchFoodData()
  }, [page])

  // console.log(listData)



  return (
    <div className='px-2 rounded-lg border border-black w-[100%] sm:w-[70%] lg:w-[75%] xl:w-[80%] overflow-scroll custom-menu'>
        <p className='font-bold text-xl sm:text-2xl lg:text-3xl py-4 px-4 text-orange-500'>Food List</p>

        {loading && <div className='flex justify-center items-center min-h-[80vh]'><LoadingSpinner />  </div>}


        {!loading && <table className=' w-full border-[#162d52] border-2'>
          <thead  className=''>
            <tr  className='text-center md:text-xl bg-[#162d52]'>
              <th className='py-4 text-[#ff7722]'>Image</th>
              <th className='py-4 text-[#ff7722]'>Name</th>
              <th className='py-4 text-[#ff7722] text-[15px]'>Category</th>
              <th className='py-4 text-[#ff7722] text-[15px]'>Price</th>
              <th className='py-4 text-[#ff7722] text-[15px]'>Remove</th>
            </tr>
              </thead>
              <tbody className=''>
                {listData.length>0 && listData.map(({_id, image, name, category, price})=>{
                  return(
                    <tr key={_id} className='text-center w-[20%]'>
                      <td className='border-x-2 border-[#162d52]'>
                        <img src={`${apiUrl}/images/${image}`} alt="" className='block mx-auto size-36 rounded-full py-4 px-4' />
                      </td>
                      <td className='text-lg sm:text-xl border-x-2 border-[#162d52] sm:font-medium' >{name}</td>
                      <td className='text-lg sm:text-xl border-x-2 border-[#162d52] sm:font-medium'>{category}</td>
                      <td className='text-lg sm:text-xl border-x-2 border-[#162d52] sm:font-medium'>${price}</td>
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
          
        </table>}

        {!loading &&  listData.length>0 && <div className=' my-4 flex justify-center items-center w-[100%]' >
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

    </div>
  )
}

export default AdminList