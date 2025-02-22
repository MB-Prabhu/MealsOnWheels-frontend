import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';

export const StoreContext = createContext("")

const StoreContextProvider = ({children})=>{

    const [cartItem, setCartItem] = useState({})
    const [isLogin, setIsLogin] = useState(false)
    const [showLogin, setShowLogin] = useState(false)
    const [token, setToken] = useState("")
    const [food_list, setFood_list] = useState([])
    const [loading, setLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")
    const [hasNext, setHasNext] = useState(false);

    const [isAdminLoggedin, setIsAdminLoggedin] = useState(false)
    const [showAdminLogin, setshowAdminLogin] = useState(false)
    const [showUserLogo, setShowUserLogo] = useState(false)

    const [category, setCategory] = useState("")

    const apiUrl = import.meta.env.VITE_API_URL

    const [isAdding, setIsAdding] = useState(false); 

let addCartItem = async (itemid) => {
    if (isAdding) {
        return; 
    }

    
    if (token) {
        setCartItem((prev) => ({
            ...prev,
            [itemid]: (prev[itemid] || 0) + 1,
        }));
    
        setIsAdding(true);
        try {
            
            await axios.patch(apiUrl + "/user/cart/addtocart", { itemid }, { headers: { token } });
        } catch (error) {
            
            setCartItem((prev) => {
                const updatedCart = { ...prev };
                updatedCart[itemid] -= 1;
                if (updatedCart[itemid] <= 0) {
                    delete updatedCart[itemid];
                }
                return updatedCart;
            });
        } finally {
            
            setIsAdding(false);
        }
    }
};

let removeCartItem = async (itemid) => {
    if (isAdding) {
        return; 
    }

    
    if (token) {
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
    
        setIsAdding(true);
        try {
            await axios.patch(apiUrl + "/user/cart/removecartitem", { itemid }, { headers: { token } });
        } catch (error) {
            setCartItem((prev) => ({
                ...prev,
                [itemid]: (prev[itemid] || 0) + 1, // Re-add the item if the API fails
            }));
        } finally {
            setIsAdding(false);
        }
    }
};

    // let addCartItem = async (itemid)=>{
    //     if(!cartItem[itemid]){
    //         setCartItem(p=> {
    //             return {...p, [itemid]:1}
    //         }
    //         )
    //     }
    //     else{
    //         setCartItem(p=> ({...p, [itemid]: p[itemid]+1}))
    //     }
    //     if(token){
    //         let {data} = await axios.patch(apiUrl+"/user/cart"+"/addtocart", {itemid}, {headers: {token}})
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
        let {data} = await axios.get(apiUrl+'/user/cart'+'/getcartitems', {headers: {token}})
        if(data.ok){
            setCartItem(data.data)
        }
       }
       catch(err){
        toast.warning(err.response.data.message, {
            autoClose: 1000
        })
       }
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

   

    const getFoodItems = async (page, limit)=>{
      try{
        setLoading(true)
        let {data} = await axios.get(apiUrl+`/api/listfood?page=${page}&limit=${limit}`)
        console.log(data)
        setErrorMsg("")
        if(data.ok){
            setFood_list(data.data)
            setHasNext(data?.data.length < limit ? true: false)
        }
      }
      catch(err){

        if(err?.message.includes("Network Error")){
            setErrorMsg(err.message + " " + "please try again later")
        }
        else{
            if(err?.response?.data?.msg.startsWith("connect ETIMEDOUT") || err.response.data.msg.startsWith("timed") || err.response.data.msg.startsWith("read")){
                setErrorMsg("please refresh the page to get the available food menu's")
            }
            else if(err.response.data.msg.startsWith("Operation")){
                setErrorMsg("please refresh and try again")
            }
            else if(err.response.data.msg.startsWith("read")){
                setErrorMsg("please refresh the page to get the available food menu's")
            }
            else{
                setErrorMsg(err.response.data.msg)
            }
        }
        
        
      }
      finally{
        setLoading(false)
      }
    }




    const getIndiCartItems = async ()=>{
       try{
        let isTokenAvailable = localStorage.key(0)
        let token = isTokenAvailable ? localStorage.getItem(isTokenAvailable) : ""
        let {data} = await axios.get(`${apiUrl}/user/cart/getcartindiitems`, {headers:{token}} )
        console.log(data)
        if(data.ok){
            setCartItem(data.data)
        }
       }
       catch(err){
        if(err.response.data.msg.startsWith("connect") || err.response.data.msg.startsWith("read") || err.response.data.msg.startsWith("Operation") ){
            toast.warning("please refresh the page to get the cart items")
        }
        else{
            if(err.response.data.msg==="user not available"){
                toast.warning(err.response.data.msg, {
                    autoClose: 1000
                })
            }
            else{
                toast.warning(err.response.data.msg+" and food items", {
                    autoClose: 1000
                })
            }
        }
       }

    }

    useEffect(()=>{
        let isTokenAvailable = localStorage.key(0)
        if(isTokenAvailable==="usertoken"){
            setShowUserLogo(true)
        }
        else if(isTokenAvailable==="admintoken"){
            setIsAdminLoggedin(true)
        }
        setToken(isTokenAvailable ? localStorage.getItem(isTokenAvailable) : "")
    },[])

    

    let value = {
        food_list,setFood_list,
        cartItem,setCartItem,
        category, setCategory,
        hasNext, setHasNext,
        isAdminLoggedin, setIsAdminLoggedin,
        addCartItem, removeCartItem, getCartItems,
        isLogin, setIsLogin,
        showAdminLogin, setshowAdminLogin,
        errorMsg, setErrorMsg,loading, setLoading,
        showLogin, setShowLogin,
        getItemTotalAmount,
        getTotalAmount, 
        showUserLogo, setShowUserLogo,
        apiUrl, token, setToken, getFoodItems, getIndiCartItems
    }
    return(
        <StoreContext.Provider value={value}>
            {children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider