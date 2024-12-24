import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
import LoadingSpinner from '../../components/LoadingSpinner'

const PaymentVerify = () => {

    const {apiUrl} = useContext(StoreContext)
    const [searchparams] = useSearchParams()

    let orderId = searchparams.get("orderId")
    let ok = searchparams.get("success")

    let navigate = useNavigate()
    
    let verifyPayment = async ()=>{
        let {data} = await axios.post(`${apiUrl}/user/order/verifyorder`,{orderId, ok})
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
           <div className='flex justify-center items-center min-h-[80vh]'><LoadingSpinner /></div>
        </div>
        
    </div>
  )
}

export default PaymentVerify