import React, { useContext, useEffect } from 'react'
import { StoreContext } from '../../context/StoreContext'
import CardTotal from './CardTotal'
import { IconButton } from '@mui/material';
import  DeleteIcon from '@mui/icons-material/Delete';

const Cart = () => {

  let {cartItem, food_list, apiUrl, getItemTotalAmount,removeCartItem,  getCartItems} = useContext(StoreContext)

  useEffect(()=>{
    // {token && getCartItems(localStorage.getItem("usertoken"))}
    getCartItems(localStorage.getItem("usertoken"))
  }, [])
  console.log(cartItem)
  return (
    <div className='p-2 w-full'>
      <div className="p-4 w-[95%]">


       {Object.keys(cartItem).length>0 ? <table className='p-2 w-full'>
          <thead>
          <tr className="text-lg md:text-xl">
            <th className='text-[#ff7722] text-[15px]'>Item</th>
            <th className='text-[#ff7722] text-[15px]'>Title</th>
            <th className='text-[#ff7722] text-[15px]'>Price</th>
            <th className='text-[#ff7722] text-[15px]'>Quantity</th>
            <th className='text-[#ff7722] text-[15px]'>Total</th>
            <th className='text-[#ff7722] text-[15px]'>Remove</th>
          </tr>
          </thead>
          <tbody>
            {food_list.map(ele=>{
              if(cartItem[ele._id]>0){
                return (
                  <tr key={ele._id} className="text-center md:text-xl border-2 border-y-[#676767] border-x-0">
                    <td className="py-2 place-items-center  ">
                      <img src={`${apiUrl}/images/${ele.image}`} alt="" className='rounded-full h-[100px] w-[100px]' />
                      </td>
                    <td className='sm:font-semibold'>{ele.name}</td>
                    <td className='sm:font-semibold'>${ele.price}</td>
                    <td>
                      <div className='flex justify-center items-center gap-2'>
                      {/* <img src={assets.remove_icon_red} alt=""
                                     onClick={()=> removeQuantityFromCart(ele._id)} 
                                     className='cursor-pointer' /> */}
                      {cartItem[ele._id]}
                      {/* <img src={assets.add_icon_green} alt=""
                                     onClick={()=> addCartItem(ele._id)} 
                                     className='cursor-pointer' /> */}
                      </div>
                      </td>
                    <td className='sm:font-semibold'>${getItemTotalAmount(ele._id)}</td>
                    <td className='sm:font-semibold'>
                      
                    {/* <Button variant="contained" 
               color='error'
               onClick={()=> deleteUser(role, _id)} 
               sx={{width: "70%", margin: "10px auto"}}
               startIcon={<DeleteIcon />}>
  Delete
</Button> */}
                      
                      <IconButton variant="contained" color="error" sx={{backgroundColor:"#e2a6a6"}} onClick={()=> removeCartItem(ele._id)} aria-label='delete'>
                        <DeleteIcon />
                      </IconButton>
                      </td>
                  </tr>
                )
              }
            })}
          </tbody>
        </table> : 
            // {errorMsg && <div className='w-full mx-auto text-2xl sm:text-3xl sm:font-semibold'>{errorMsg}</div>}        
            <div className='w-full text-[#676767] mx-auto min-h-[45vh] text-center place-content-center text-2xl sm:text-3xl font-semibold'>
              No Carts added yet...
              </div>}
      </div>


{Object.keys(cartItem).length>0 && <div className='w-[95%] px-4'>
              <CardTotal />
</div>}

      

    </div>
  )
}

export default Cart