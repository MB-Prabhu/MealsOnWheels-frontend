import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'

const PaymentVerify = () => {

    const {apiUrl} = useContext(StoreContext)
    const [searchparams, setSearchParams] = useSearchParams()

    let orderId = searchparams.get("orderId")
    let ok = searchparams.get("success")

    let navigate = useNavigate()
    
    let verifyPayment = async ()=>{
        let {data} = await axios.post(`${apiUrl}/user/order/verifyorder`,{orderId, ok})
        console.log(data)
        if(data.ok){
            navigate("/myorders")
        }
        else{
            navigate("/")
        }
    }

    useEffect(()=>{
        verifyPayment()
    }, [])

  return (
    <div className='w-full'>
        <div className='w-[95%] flex justify-center items-center'>
            <div className="outerwidth">
                <div className="innerspinner">
                    <p className='text-4xl font-bold'>Loading...</p>
                </div>
            </div>
        </div>
        
    </div>
  )
}

export default PaymentVerify