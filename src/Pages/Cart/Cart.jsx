import React, { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import { assets, food_list } from '../../assets/assets/frontend_assets/assets'
import CardTotal from './CardTotal'

const Cart = () => {

  let {cartItem, getItemTotalAmount, removeTotalQuantity,removeCartItem, addCartItem, removeQuantityFromCart} = useContext(StoreContext)

  return (
    <div className='p-2 w-full'>
      <div className="p-4 w-[95%]">
        <table className='p-2 w-full'>
          <thead>
          <tr className="text-lg md:text-xl">
            <th>Item</th>
            <th>Title</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Remove</th>
          </tr>
          </thead>
          <tbody>
            {food_list.map(ele=>{
              if(cartItem[ele._id]>0){
                return (
                  <tr key={ele._id} className="text-center md:text-xl border-2 border-y-[#676767] border-x-0">
                    <td className="py-2 place-items-center  ">
                      <img src={ele.image} alt="" className='rounded-full h-[100px] w-[100px]' />
                      </td>
                    <td className=''>{ele.name}</td>
                    <td className=''>{ele.price}</td>
                    <td className=''>
                      <img src={assets.remove_icon_red} alt=""
                                     onClick={()=> removeQuantityFromCart(ele._id)} 
                                     className='cursor-pointer' />
                      {cartItem[ele._id]}
                      <img src={assets.add_icon_green} alt=""
                                     onClick={()=> addCartItem(ele._id)} 
                                     className='cursor-pointer' />
                      </td>
                    <td className=''>{getItemTotalAmount(ele._id)}</td>
                    <td className=''><button onClick={()=> removeTotalQuantity(ele._id)}>remove</button></td>
                  </tr>
                )
              }
            })}
          </tbody>
        </table>
      </div>


{Object.keys(cartItem).length>0 && <div className='w-[95%] px-4'>
              <CardTotal />
</div>}

      

    </div>
  )
}

export default Cart