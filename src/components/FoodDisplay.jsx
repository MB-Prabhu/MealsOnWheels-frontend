import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../context/StoreContext'
import SingleFoodItem from './SingleFoodItem'
import LoadingSpinner from './LoadingSpinner'
import  axios  from 'axios';
import SearchIcon  from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { toast } from 'react-toastify';

const FoodDisplay = () => {
    const {food_list, setFood_list, errorMsg,setErrorMsg, loading, hasNext,setHasNext ,setLoading, apiUrl, getFoodItems, getIndiCartItems, category} = useContext(StoreContext)
    console.log(category)
    const [searchValue, setSearchValue] = useState("")
    const [page, setPage] = useState(1)
    const [loadingSearch, setLoadingsearch] = useState(false)
    const [errorMsgSearch, setErrorMsgSearch] = useState("")
    const [limit] = useState(12)


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

const getCategorizedFood = async ()=>{
  try{
   setLoading(true)
   let {data} = await axios.get(`${apiUrl}/api/categoryfood?category=${category}&page=${page}&limit=${limit}`)
   if(data.ok){
       setFood_list(data.data)
       setHasNext(data?.data.length < limit ? true: false)
   }
  }
  catch(err){
   console.log(err)
   if(err.response.data.msg.startsWith("connect ETIMEDOUT") || err.response.data.msg.startsWith("read") || err.response.data.msg.startsWith("Operation") || err.response.data.msg.startsWith("connection") || err.response.data.msg.includes("timed")){
       setErrorMsg("please refresh the page to get the available food items")
   }
   else if(err.response.data.msg==="Not enough data available. Total pages: 1"){
    null
   }
   else{
       toast.warning(err.response.data.msg, {
           autoClose: 1000
       })
   }
  }
  finally{
   setLoading(false)
  }
}
 
    const searchFood = async()=>{
        try{
          setErrorMsgSearch("")
          setLoadingsearch(true)
            let {data} = await axios.get(`${apiUrl}/user/cart/searchFood?search=${searchValue}&page=${page}&limit=${limit}`)
            if(data.ok){
              setFood_list(data.data)
              setHasNext(data?.data.length < limit ? true: false)
            }
        }
        catch(err){
          if(err.message.startsWith("Network")){
            toast.error(err.message)
          }
          else{
            if(err.response.data.msg.startsWith("Operation") || err.response.data.msg.startsWith("connect ETIMEDOUT") || err.response.data.msg.startsWith("read") || err.response.data.msg.startsWith("connection") || err.response.data.msg.includes("timed")){
              setErrorMsgSearch("please try again")
              }
              else{
                setErrorMsgSearch(err.response.data.msg)
              }
          }
           
        }
        finally{
            setLoadingsearch(false)
        }
    }

    useEffect(()=>{
      if(!category){
        getFoodItems(page, limit)
      }
      else{
        getCategorizedFood()
      }
    },[category, page])


  useEffect(()=>{
    let isTokenAvailable = localStorage.key(0)
    let token = isTokenAvailable==="usertoken" ? localStorage.getItem(isTokenAvailable) : ""
    if(token){
      getIndiCartItems()
    }
  }, [])

  return (
    <div className='w-full flex flex-col items-center'>

        <div className='w-[90%] mt-4'>
        <p className='text-2xl sm:text-3xl sm:font-semibold'>your selected Food Items</p>
        </div>

      <div className='border-2 relative w-[60%] border-blue-500 rounded-lg px-2 my-4'>
        
        <input type="text" 
        value={searchValue}
        placeholder='Search '
        onChange={(e)=> setSearchValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') searchFood();}}
        className='border-none outline-none h-10 text-lg w-[95%]' />

        <IconButton onClick={searchFood} sx={{position:"absolute", right:"0", top: "0"}}>
        <SearchIcon />
        </IconButton>
      </div>

      { (loadingSearch || loading) && <div className='flex justify-center items-center min-h-[20vh]'><LoadingSpinner />  </div>}

            {(!loadingSearch || !loading )&& errorMsg && <div className='w-full text-center py-7 text-2xl sm:text-2xl sm:font-semibold '><p>{errorMsg}</p></div>}        
            {(!loadingSearch || !loading) && !errorMsg && errorMsgSearch && <div className='w-full text-center py-7 text-2xl sm:text-2xl sm:font-semibold '><p>{errorMsgSearch}</p></div>}        
        <div className='w-[90%]  py-8 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 gap-10'>
            {!loadingSearch && !loading && !errorMsgSearch && !errorMsg && food_list.length>0 && food_list.map(({_id, name, image, price, description,category})=>{
                           return <SingleFoodItem key={_id} _id={_id} name={name} image={image} price={price} description={description} category={category}  />
                    })}
        </div>


        {!errorMsg && !errorMsgSearch && !loading &&  food_list.length>0 && <div className=' my-4 flex justify-center items-center w-[100%]' >
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

export default FoodDisplay