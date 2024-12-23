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
    const [loading, setLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")

    const [showAdminLogin, setshowAdminLogin] = useState(false)
    

    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)

    const apiUrl = import.meta.env.VITE_API_URL

    const [isAdding, setIsAdding] = useState(false); // Single state to track the adding process

let addCartItem = async (itemid) => {
    if (isAdding) {
        return; // Prevent adding if an API call is already in progress
    }

    // Optimistically update the cart state
    setCartItem((prev) => ({
        ...prev,
        [itemid]: (prev[itemid] || 0) + 1,
    }));

    // Set the isAdding state to true to indicate an API call is in progress
    setIsAdding(true);

    if (token) {
        try {
            // Make the API call to sync with the server
            await axios.patch(apiUrl + "/user/cart/addtocart", { itemid }, { headers: { token } });
        } catch (error) {
            console.error("Error adding to cart:", error);
            // Revert the state if the API call fails
            setCartItem((prev) => {
                const updatedCart = { ...prev };
                updatedCart[itemid] -= 1;
                if (updatedCart[itemid] <= 0) {
                    delete updatedCart[itemid];
                }
                return updatedCart;
            });
        } finally {
            // Reset the isAdding state after the API call is complete
            setIsAdding(false);
        }
    }
};

let removeCartItem = async (itemid) => {
    if (isAdding) {
        return; // Prevent removing if an API call is already in progress
    }

    // Optimistically update the cart state
    setCartItem((prev) => {
        const updatedCart = { ...prev };
        if (updatedCart[itemid] > 0) {
            updatedCart[itemid] -= 1;
            if (updatedCart[itemid] === 0) {
                delete updatedCart[itemid];
            }
        }
        return updatedCart;
    });

    // Set the isAdding state to true to indicate an API call is in progress
    setIsAdding(true);

    if (token) {
        try {
            // Make the API call to sync with the server
            await axios.patch(apiUrl + "/user/cart/removecartitem", { itemid }, { headers: { token } });
        } catch (error) {
            console.error("Error removing from cart:", error);
            // Revert the state if the API call fails
            setCartItem((prev) => ({
                ...prev,
                [itemid]: (prev[itemid] || 0) + 1, // Re-add the item if the API fails
            }));
        } finally {
            // Reset the isAdding state after the API call is complete
            setIsAdding(false);
        }
    }
};

    // let addCartItem = async (itemid)=>{
    //     if(!cartItem[itemid]){
    //         setCartItem(p=> {
    //             console.log(p)
    //             return {...p, [itemid]:1}
    //         }
    //         )
    //     }
    //     else{
    //         setCartItem(p=> ({...p, [itemid]: p[itemid]+1}))
    //     }
    //     if(token){
    //         let {data} = await axios.patch(apiUrl+"/user/cart"+"/addtocart", {itemid}, {headers: {token}})
    //         console.log(data)
    //     }
    // }

    // let removeCartItem= async (itemid)=>{
    //        if(cartItem[itemid]>0){
    //         setCartItem(p=> {
    //            let removedItem = {...p}
    //            removedItem[itemid] -= 1
    //            if(!removedItem[itemid]){
    //                 delete removedItem[itemid]
    //            }
    //           return removedItem
    //         })
    //         if(token){
    //              await axios.patch(apiUrl+'/user/cart'+"/removecartitem", {itemid}, {headers: {token}})
               
    //          }
    //     }
    
        
    //     // if(cartItem[itemid]===1){
    //     //     setCartItem(p=>{
    //     //         let modifyObject = {}
    //     //         for(let key in p){
    //     //             if(p[key]!==0){
    //     //                 modifyObject[key] = p[key]
    //     //             }
    //     //         }
    //     //         return modifyObject
    //     //     })
    //     // }
    // }


    let getCartItems = async (token)=>{
       try{
        console.log(token)
        let {data} = await axios.get(apiUrl+'/user/cart'+'/getcartitems', {headers: {token}})
        console.log(data.data)
        setCartItem(data.data)
       }
       catch(err){
        console.log(err.response.data)
       }
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
        setLoading(true)
        let {data} = await axios.get(apiUrl+`/api/listfood?page=${page}&limit=${limit}`)
        // console.log(data)
        setErrorMsg("")
        if(data.ok){
            setFood_list(data.data)
        }
      }
      catch(err){
        console.log(err)
        if(err.response.data.msg.startsWith("connect ETIMEDOUT")){
            setErrorMsg("please refresh the page to get the available food menu's")
        }
        else if(err.response.data.msg.startsWith("Operation")){
            setErrorMsg("please try again")
        }
        else if(err.response.data.msg.startsWith("Operation `foodschemas.find()`")){
            setErrorMsg("please refresh the page to get the available food menu's")
        }
        else if(err.response.data.msg.startsWith("read ECONNRESET")){
            setErrorMsg("please refresh the page to get the available food menu's")
        }
        else{
            setErrorMsg(err.response.data.msg)
        }
      }
      finally{
        setLoading(false)
      }
    }

    useEffect(()=>{
        let isTokenAvailable = localStorage.key(0)
        setToken(isTokenAvailable ? localStorage.getItem(isTokenAvailable) : "")
        // setToken(localStorage.getItem("usertoken"))
        // {token && getCartItems(localStorage.getItem("usertoken"))}
        getFoodItems()
    },[])

    useEffect(()=>{
        console.log(cartItem)
    }, [cartItem])

    let value = {
        food_list,setFood_list,
        cartItem,
        setCartItem,
        addCartItem, removeCartItem, getCartItems,
        isLogin, setIsLogin,
        showAdminLogin, setshowAdminLogin,
        errorMsg, setErrorMsg,loading, setLoading,
        showLogin, setShowLogin,
        getItemTotalAmount,
        getTotalAmount,
        removeTotalQuantity, removeQuantityFromCart,
        apiUrl, token, setToken, getFoodItems
    }
    return(
        <StoreContext.Provider value={value}>
            {children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider