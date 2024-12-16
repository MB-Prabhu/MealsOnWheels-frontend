import React, { createContext } from 'react'

const StoreContext = createContext(null)

const StoreContextProvider = ({children})=>{
    let value = {}
    return(
        <StoreContext.Provider value={value}>
            {children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider