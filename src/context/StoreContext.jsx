import React, { createContext, useEffect, useState } from 'react'
import { food_list } from '../assets/assets/frontend_assets/assets'

export const StoreContext = createContext("")

const StoreContextProvider = ({children})=>{

    const [cartItem, setCartItem] = useState({})
    const [isLogin, setIsLogin] = useState(false)
    const [showLogin, setShowLogin] = useState(false)

    let addCartItem = (itemid)=>{
        if(!cartItem[itemid]){
            setCartItem(p=> {
                return {...p, [itemid]:1}
            }
            )
        }
        else{
            setCartItem(p=> ({...p, [itemid]: p[itemid]+1}))
        }
    }

    let removeCartItem=(itemid)=>{
           if(cartItem[itemid]>0){
            setCartItem(p=> {
              return {...p, [itemid]:p[itemid]-1}
            })
        }
    }

    let getItemTotalAmount = (itemid)=>{
        console.log(itemid)
        let findItem = food_list.find(ele=> ele._id == itemid)
        console.log(findItem) //todo
        if(!findItem){
            return "Item Not Added in Cart"
        }
        return findItem.price * cartItem[itemid]
    }

    let getTotalAmount = ()=>{
        if(Object.keys(cartItem).length>0){
            let getCartAddedItems = food_list.filter(ele=> Object.keys(cartItem).includes(ele._id) )
            let separateItemTotal=getCartAddedItems.map((ele)=> {
                  if(Object.keys(cartItem).includes(ele._id)){
                    return ele.price * cartItem[ele._id]
                  }
              })
      
              let totalAmount= separateItemTotal.reduce((a,b)=> a+b)
              return totalAmount
        }
    }

    // let getTotalAmount = ()=>{
    //     let totalAmount = 0;
    //     for(const key in cartItem){
    //         if(cartItem[key]>0){
    //             let separateItem = food_list.find(ele=> ele._id === key)
    //             totalAmount += separateItem.price * cartItem[key]
    //         }
    //     }
    //     return totalAmount;
    // }

    let value = {
        food_list,
        cartItem,
        setCartItem,
        addCartItem, removeCartItem,
        isLogin, setIsLogin,
        showLogin, setShowLogin,
        getItemTotalAmount,
        getTotalAmount
    }
    return(
        <StoreContext.Provider value={value}>
            {children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider