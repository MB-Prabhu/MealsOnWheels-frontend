import { Button, TextField, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import { StoreContext } from '../context/StoreContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {

const {getTotalAmount, token, food_list, cartItem, apiUrl} = useContext(StoreContext)
  const [deliveryData, setdeliveryData] = useState({
        Name: "",
        mobile: "",
        email: "",
        address: "",
        pincode: "",
        landmark: ""
      })
    
      const [errorMsg, setErrorMsg] = useState("")

      let handleChange = ({target: {name, value}})=>{
          setdeliveryData((p)=> ({...p, [name]: value}))
      }
 
  
      let placeOrder = async (e)=>{
        e.preventDefault()
        let ordersToPlaced = []
        setErrorMsg("")
        try{
          food_list.map(item=>{
            if(cartItem[item._id]>0){  

                  let iteminfo = item
                  console.log(iteminfo)
                  iteminfo["quantity"] = cartItem[item._id]
                  ordersToPlaced.push(iteminfo)
            }
          })


          let orderDetails = {
            address:deliveryData,
            items: ordersToPlaced,
            amount: getTotalAmount()+2
          }

          let {data} = await axios.post(`${apiUrl}/user/order/placeorder`,{orderDetails}, {headers: {token}})
          if(data.ok){
            let session_url = data.data
            window.location.replace(session_url)
          }
        }
        catch(err){
          setErrorMsg(err.response.data.msg)
          toast.error(err.response.data.msg)
        }
       
      }

  return (
    <div className="p-20 flex md:flex-row justify-around sm:justify-between gap-10 sm:gap-4 items-center flex-col">
     
 <form onSubmit={placeOrder} className='md:w-[50%] border border-black sm:w-[100%] py-4 px-6 shadow-lg flex flex-col rounded-lg gap-4 font-extrabold'>
      <Typography variant="h5" style={{ textAlign: "center", margin: "16px 0", color:"orangered", fontWeight:"600", letterSpacing: "5px", textTransform: "uppercase"}}>
       Delivery Details
      </Typography>

      <TextField
        label="Name"
        name="Name"
        value={deliveryData.name}
        onChange={handleChange}
        fullWidth
        required
        type="text"
      />

      <TextField
        label="Mobile"
        name="mobile"
        value={deliveryData.mobile}
        onChange={handleChange}
        fullWidth
        required
        type="number"
        slotProps={{
          input: {
            maxLength: 10,
          },
        }}
      />

<TextField
        label="Email"
        name="email"
        value={deliveryData.email}
        onChange={handleChange}
        fullWidth
        required
        type="email"
      />

      <TextField
        label="Pincode"
        name="pincode"
        value={deliveryData.pincode}
        onChange={handleChange}
        fullWidth
        required
        type="number"
      />

<TextField
        label="Address"
        name="address"
        value={deliveryData.address}
        onChange={handleChange}
        fullWidth
        required
        multiline
        rows={3}
        type="text"
      />

      <TextField
        label="Landmark"
        name="landmark"
        value={deliveryData.landmark}
        onChange={handleChange}
        fullWidth
        required
        type="text"
      />

      <Button
        type="submit"
        variant="contained"
        color="warning"
        style={{ alignSelf: "center",height:{xs: "30px", sm:"45px"} , fontSize:{sm:"0.9em",md:"1.2em"},width: "40%",backgroundColor: "orangered", color: "white"}}
      >
        Submit
      </Button>
    </form>
    
    <div className=' w-[100%] lg:w-[37%] md:w-[50%] sm:w-[70%] '>
       <div className='w-[80%] lg:w-[100%] md:w-[90%] sm:w-[100%] sm:h-[70%]'>
              <h2 className='md:text-3xl text-2xl text-[#ff7722] font-bold my-4'>Card Total</h2>
              
              <div className='flex flex-col gap-4 px-4'>
                  <p className='flex justify-between sm:justify-between text-xl font-semibold'>SubTotal <span className='font-normal'>${getTotalAmount() || 0}</span></p>
                  <hr className='bg-[#676767]' />
                  <p className='flex justify-between text-xl font-semibold'>Delivery Fee <span className='font-normal'>$2</span></p>
                  <hr className='bg-[#676767]' />
                  <p className='flex justify-between text-xl font-semibold'>Total <span className='font-bold'>${getTotalAmount()+2 || 0}</span></p>
              </div>
      
              {/* <Button variant='contained'
              onClick={()=> navigate('/placeorder')}
               className='px-4 py-1 text-white' sx={{backgroundColor: "orangered", margin: "10px 0"}}>
                  Proceed to Checkout
              </Button> */}
      
          </div>
    </div>
    </div>
  )
}

export default PlaceOrder