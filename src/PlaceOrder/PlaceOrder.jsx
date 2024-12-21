import { Button, TextField, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import { StoreContext } from '../context/StoreContext'
import CardTotal from '../Pages/Cart/CardTotal'
import axios from 'axios'

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
  
  
      let handleChange = ({target: {name, value}})=>{
          setdeliveryData((p)=> ({...p, [name]: value}))
      }
   {/* <TextField label="Email"
                value={deliveryData.email}
                onChange={(e)=> handleChange(e)}
                name="email" variant="outlined" 
                sx={{height: "40px"}} /> */}
      // let handleSignupSubmit=(e)=>{
      //   e.preventDefault()
      //   console.log(deliveryData)
      //   setdeliveryData({
      //     Name: "",
      //     mobile: "",
      //     email: "",
      //     address: "",
      //     pincode: "",
      //     landmark: ""
      //   })
      // }
  
      let placeOrder = async (e)=>{
        e.preventDefault()
        let ordersToPlaced = []
        try{
          food_list.map(item=>{
            // console.log(item)
            if(cartItem[item._id]>0){  
              console.log(cartItem)

                  let iteminfo = item
                  console.log(iteminfo)
                  iteminfo["quantity"] = cartItem[item._id]
                  ordersToPlaced.push(iteminfo)
            }
          })

          console.log(ordersToPlaced)

          let orderDetails = {
            address:deliveryData,
            items: ordersToPlaced,
            amount: getTotalAmount()+2
          }

          let {data} = await axios.post(`${apiUrl}/user/order/placeorder`,{orderDetails}, {headers: {token}})
          console.log(data)
          if(data.ok){
            let session_url = data.data
            console.log(session_url)
            window.location.replace(session_url)
          }
          else{
            alert("error")
          }

        }
        catch(err){
          console.log(err)
        }
       
      }

  return (
    <div className="p-20 flex md:flex-row justify-between items-center flex-col">
       {/* <div 
      className={`rounded-lg border border-black w-[100%] sm:w-[50%] lg:w-[60%] xl:w-[30%] bg-[#f7f7f7] `} >
        <form action="" onSubmit={handleSignupSubmit} className="flex flex-col gap-6 px-6">
          <div className='text-center py-4 text-2xl font-bold'>
            Delivery details
          </div>

            <div className='flex flex-col'>
           
           <div className='flex gap-4 my-7'>
           <TextField label="Name" 
              value={deliveryData.Name}
              onChange={(e)=> handleChange(e)}
              name="Name" variant="outlined" 
              sx={{height: "40px",  flex: 1}} />

              <TextField label="Mobile"
              value={deliveryData.mobile}
              onChange={(e)=> handleChange(e)}
              name="mobile" variant="outlined" 
              sx={{height: "40px", flex: 1}} />
           </div>
              

               

              <TextField label="Address"
              value={deliveryData.address}
              onChange={(e)=> handleChange(e)}
              name="address" variant="outlined" 
              multiline
              rows={2}
              maxRows={4}
              sx={{height: "40px", margin: "5px 0"}} />

            <TextField label="Pincode"
              value={deliveryData.password}
            onChange={(e)=> handleChange(e)}
            name="pincode" variant="outlined" 
            sx={{height: "40px", margin: "5px 0"}} />

              <TextField label="Landmark"
              onChange={(e)=> handleChange(e)}
              value={deliveryData.confirmPassword}
              name="landmark" variant="outlined" 
              sx={{height: "40px"}} />
       
              
         
            </div>

            <Button variant="contained" type="submit" color="success"
            sx={{width: "40%", margin: "10px auto"}}>Submit</Button>
        </form>
      </div> */}
 <form onSubmit={placeOrder} className='md:w-[50%] sm:w-[100%] py-4 px-6 shadow-lg flex flex-col rounded-lg gap-4 font-extrabold'
      // style={{
      //   width: "50%",
      //   margin: "0 auto",
      //   display: "flex",
      //   flexDirection: "column",
      //   gap: "16px",
      //   marginTop: "32px",
      //   padding: "24px",
      //   boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
      //   borderRadius: "8px",
      // }}
    >
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
      />

      <TextField
        label="Mobile"
        name="mobile"
        value={deliveryData.mobile}
        onChange={handleChange}
        fullWidth
        required
        type="tel"
        inputProps={{ maxLength: 10 }}
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
      />

      <TextField
        label="Landmark"
        name="landmark"
        value={deliveryData.landmark}
        onChange={handleChange}
        fullWidth
        required
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
    
    <div>
      <CardTotal />
    </div>
    </div>
  )
}

export default PlaceOrder