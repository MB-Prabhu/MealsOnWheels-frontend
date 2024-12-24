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

const FoodDisplay = ({selectedCategory}) => {
    const {food_list, setFood_list, errorMsg, loading, apiUrl, getFoodItems, getIndiCartItems} = useContext(StoreContext)


    const [searchValue, setSearchValue] = useState("")
    const [page, setPage] = useState(1)
    const [loadingSearch, setLoadingsearch] = useState(false)
    const [errorMsgSearch, setErrorMsgSearch] = useState("")
    const limit = 12
  const [hasNext, setHasNext] = useState(false);


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
 
    const searchFood = async()=>{
        try{
          setErrorMsgSearch("")
          setLoadingsearch(true)
          console.log(limit)
            let {data} = await axios.get(`${apiUrl}/user/cart/searchFood?search=${searchValue}&page=${page}&limit=${limit}`)
            console.log(data)
            if(data.ok){
              setFood_list(data.data)
              setHasNext(data?.data.length < limit ? true: false)
            }
        }
        catch(err){
          console.log(err) 
          if(err.message.startsWith("Network")){
            toast.error(err.message)
          }
          else{
            if(err.response.data.msg.startsWith("Operation")){
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

    const isSelectedAvailable = ()=>{
      let isAvailable = true;
      if(selectedCategory!=="all"){
        isAvailable = food_list.some(ele=>{
         return ele.category === selectedCategory
       })
      }
      return isAvailable;
    }

    useEffect(()=>{
      if(selectedCategory==="all"){
        getFoodItems()
      }
    },[selectedCategory])

    useEffect(()=>{
      searchFood()
  }, [page])

  useEffect(()=>{
    let isTokenAvailable = localStorage.key(0)
    let token = isTokenAvailable ? localStorage.getItem(isTokenAvailable) : ""
    if(token){
      getIndiCartItems()
    }
  }, [])

    // console.log(isSelectedAvailable())
  return (
    <div className='w-full flex flex-col items-center'>

        <div className='w-[90%] mt-4'>
        <p className='text-2xl sm:text-3xl sm:font-semibold'>your selected Food Items</p>
        </div>

      <div className='border-2 relative w-[60%] border-blue-500 rounded-lg px-2 my-2'>
        
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
      {!isSelectedAvailable() && <div className='flex justify-center font-bold text-xl sm:text-2xl lg:text-3xl items-center min-h-[20vh]'>
        No Foods Available for the selected category  </div>}

            {(!loadingSearch || !loading )&& errorMsg && <div className='w-full text-center py-7 text-2xl sm:text-2xl sm:font-semibold '><p>{errorMsg}</p></div>}        
            {(!loadingSearch || !loading) && !errorMsg && errorMsgSearch && <div className='w-full text-center py-7 text-2xl sm:text-2xl sm:font-semibold '><p>{errorMsgSearch}</p></div>}        
        <div className='mt-2 w-[90%]  py-8 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-10'>
            {isSelectedAvailable && !loadingSearch && !loading && !errorMsgSearch && !errorMsg && food_list.length>0 && food_list.map(({_id, name, image, price, description,category})=>{
                        if(selectedCategory==="all"){
                          return <SingleFoodItem key={_id} _id={_id} name={name} image={image} price={price} description={description} category={category}  />
                        }
                        else if(category===selectedCategory){
                           return <SingleFoodItem key={_id} _id={_id} name={name} image={image} price={price} description={description} category={category}  />
                          }
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