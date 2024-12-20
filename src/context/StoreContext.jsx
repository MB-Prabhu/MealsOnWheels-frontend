import React, { createContext, useEffect, useState } from 'react'
import { food_list } from '../assets/assets/frontend_assets/assets'

export const StoreContext = createContext("")

const StoreContextProvider = ({children})=>{

    const [cartItem, setCartItem] = useState({})
    const [isLogin, setIsLogin] = useState(false)
    const [showLogin, setShowLogin] = useState(false)
    const [token, setToken] = useState("")

    const apiUrl = import.meta.env.VITE_API_URL

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
        
        if(cartItem[itemid]===1){
            setCartItem(p=>{
                let modifyObject = {}
                for(let key in p){
                    if(p[key]!==0){
                        modifyObject[key] = p[key]
                    }
                }
                return modifyObject
            })
        }
    }

    let removeQuantityFromCart =(itemid)=>{
        if(cartItem[itemid]>1){
         setCartItem(p=> {
           return {...p, [itemid]:p[itemid]-1}
         })
     }
    }

    const removeTotalQuantity = (itemid)=>{
        setCartItem(p=>{
                let modifyObject = {}
                for(let key in p){
                    if(key !== itemid){
                        modifyObject[key] = p[key]
                    }
                }
                return modifyObject
            })
    }

    let getItemTotalAmount = (itemid)=>{
        let findItem = food_list.find(ele=> ele._id == itemid)
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

    useEffect(()=>{
        let isTokenAvailable = localStorage.key("usertoken")
        setToken(isTokenAvailable ? localStorage.getItem("usertoken") : "")
    },[])

    

    useEffect(()=>{
        console.log(cartItem)
    }, [cartItem])

    let value = {
        food_list,
        cartItem,
        setCartItem,
        addCartItem, removeCartItem,
        isLogin, setIsLogin,
        showLogin, setShowLogin,
        getItemTotalAmount,
        getTotalAmount,
        removeTotalQuantity, removeQuantityFromCart,
        apiUrl, token, setToken
    }
    return(
        <StoreContext.Provider value={value}>
            {children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider