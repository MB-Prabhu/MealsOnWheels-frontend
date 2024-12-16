import React, { createContext, useState } from 'react'
import { food_list } from '../assets/assets/frontend_assets/assets'

export const StoreContext = createContext(null)

const StoreContextProvider = ({children})=>{

    const [cartItem, setCartItem] = useState({})

    let addCartItem = (itemid)=>{
        console.log(itemid)
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

    let value = {
        food_list,
        cartItem,
        setCartItem,
        addCartItem, removeCartItem
    }
    return(
        <StoreContext.Provider value={value}>
            {children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider