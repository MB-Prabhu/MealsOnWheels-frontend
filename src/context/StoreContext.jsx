import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
// import { food_list } from '../assets/assets/frontend_assets/assets'

export const StoreContext = createContext("")

const StoreContextProvider = ({children})=>{

    const [cartItem, setCartItem] = useState({})
    const [isLogin, setIsLogin] = useState(false)
    const [showLogin, setShowLogin] = useState(false)
    const [token, setToken] = useState("")
    const [food_list, setFood_list] = useState([])

    const [errorMsg, setErrorMsg] = useState("")

    const apiUrl = import.meta.env.VITE_API_URL

    let addCartItem = async (itemid)=>{
        if(!cartItem[itemid]){
            setCartItem(p=> {
                console.log(p)
                return {...p, [itemid]:1}
            }
            )
        }
        else{
            setCartItem(p=> ({...p, [itemid]: p[itemid]+1}))
        }
        if(token){
            let {data} = await axios.patch(apiUrl+"/user/cart"+"/addtocart", {itemid}, {headers: {token}})
            console.log(data)
        }
    }

    let removeCartItem= async (itemid)=>{
           if(cartItem[itemid]>0){
            setCartItem(p=> {
               let removedItem = {...p}
               removedItem[itemid] -= 1
               if(!removedItem[itemid]){
                    delete removedItem[itemid]
               }
              return removedItem
            })
            if(token){
                 await axios.patch(apiUrl+'/user/cart'+"/removecartitem", {itemid}, {headers: {token}})
               
             }
        }
    
        
        // if(cartItem[itemid]===1){
        //     setCartItem(p=>{
        //         let modifyObject = {}
        //         for(let key in p){
        //             if(p[key]!==0){
        //                 modifyObject[key] = p[key]
        //             }
        //         }
        //         return modifyObject
        //     })
        // }
    }


    let getCartItems = async (token)=>{
        console.log(token)
        let {data} = await axios.get(apiUrl+'/user/cart'+'/getcartitems', {headers: {token}})
        console.log(data.data)
        setCartItem(data.data)
    }

    //this  function for removing the qunatity from cart not from home 
    let removeQuantityFromCart = async (itemid)=>{
        if(cartItem[itemid]>1){
         setCartItem(p=> {
           return {...p, [itemid]:p[itemid]-1}
         })
         if(token){
            await axios.patch(apiUrl+'/user/cart'+"/removecartitem", {itemid}, {headers: {token}})
         }
     }
    }

    //this  function for removing the entire item from the cart 
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
            let totalAmount = 0
            let getCartAddedItems = food_list.filter(ele=> Object.keys(cartItem).includes(ele._id) )
            let separateItemTotal=getCartAddedItems.map((ele)=> {
                  if(Object.keys(cartItem).includes(ele._id)){
                    return ele.price * cartItem[ele._id]
                  }
              })
              if(separateItemTotal.length>0){
                   totalAmount= separateItemTotal.reduce((a,b)=> a+b)
                }
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

    const getFoodItems = async ()=>{
      try{
        let {data} = await axios.get(apiUrl+"/api/listfood")
        // console.log(data)
        setErrorMsg("")
        if(data.ok){
            setFood_list(data.data)
        }
      }
      catch(err){
        console.log(err)
        setErrorMsg(data.data.msg)
      }
    }

    useEffect(()=>{
        let isTokenAvailable = localStorage.key("usertoken")
        setToken(isTokenAvailable ? localStorage.getItem("usertoken") : "")
        setToken(localStorage.getItem("usertoken"))
        // {token && getCartItems(localStorage.getItem("usertoken"))}
        getFoodItems()
    },[])

    

    // useEffect(()=>{
    //     console.log(cartItem)
    // }, [cartItem])

    let value = {
        food_list,
        cartItem,
        setCartItem,
        addCartItem, removeCartItem, getCartItems,
        isLogin, setIsLogin,
        errorMsg, setErrorMsg,
        showLogin, setShowLogin,
        getItemTotalAmount,
        getTotalAmount,
        removeTotalQuantity, removeQuantityFromCart,
        apiUrl, token, setToken, 
    }
    return(
        <StoreContext.Provider value={value}>
            {children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider