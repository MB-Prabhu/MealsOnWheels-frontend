import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets/admin_assets/assets'
import { TextField, Button, MenuItem, Select, InputLabel } from '@mui/material';
import { toast } from 'react-toastify';
import axios  from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';
import { StoreContext } from '../context/StoreContext';

const AdminAdd = () => {
  const {apiUrl} = useContext(StoreContext)
  const {token} = useContext(StoreContext)

  const[imageUpload, setImageUpload] = useState(null)
  const[loading, setLoading] = useState(false)
  const[productData, setProductData] = useState({
    name:"",
    description:"",
    price:"",
    category:"Salad"
  })

  let handleChange = ({target:{name, value}})=>{
    setProductData((p)=>({...p, [name]: value}))
  }

  let handleSubmit= async (e)=>{
      e.preventDefault()
      const formData = new FormData()
      formData.append("name", productData.name)
      formData.append("description", productData.description)
      formData.append("price", Number(productData.price))
      formData.append("category", productData.category)
      formData.append("image", imageUpload)

      try{
        setLoading(true)
        let {data} = await axios.post(`${apiUrl}/api/createfood`,formData, {headers: {token}})
        if(data.ok){
          setProductData({
            name:"",
            description:"",
            price:"",
            category:"Salad"
          })
          setImageUpload(null)
          toast.success(data.msg, {
            autoClose: 2000
          })
        }

      }
      catch(err){
        if(err.response.data?.msg.startsWith("Operation")){
          toast.warning("please try again")
        }
        else{
          toast.warning(err.response.data?.msg,  {
            autoClose: 1000
          })
        }
      }
      finally{
        setLoading(false)
      }
  }

  return (
    <div className=' rounded-lg px-2 border relative border-black w-[100%] sm:w-[70%] lg:w-[75%] xl:w-[80%]'>

      {loading && <div className='flex absolute w-full h-full justify-center bg-[#000000aa] bg-opacity-50 items-center min-h-[80vh]'><LoadingSpinner />  </div>}

      <form onSubmit={handleSubmit} className='px-4 w-full py-4 flex flex-col gap-6'>
        <div className=''>
          <p className='text-lg sm:text-2xl font-bold'>upload image</p>
          <label htmlFor="imgupload" className=''>
          <img src={imageUpload ? URL.createObjectURL(imageUpload) : assets.upload_area}
           alt="" 
           className='my-2 w-40 h-24 bg-contain object-cover border border-black pointer-events-none'
           onClick={() => fileInputRef.current.click()} 
           />
          </label>
          <input type="file" id='imgupload'
           hidden 
           
           onChange={(e)=> setImageUpload(e.target.files[0])}/>
        </div>

        <div className=''>
          <p className='text-lg sm:text-2xl font-bold'>Product Name</p>
           
           <TextField variant='outlined' required onChange={handleChange} name="name"  value={productData.name} sx={{height: "40px", fontSize:"44px", margin:"5px 0"}}/>
        </div>

        <div className=''>
          <p className='text-lg sm:text-2xl font-bold'>Product Description</p>
          <TextField variant='outlined' required onChange={handleChange} name="description" value={productData.description} rows={7}  sx={{height: "40px", fontSize:"44px", margin:"5px 0"}} />
        </div>

        <div className='flex gap-4 w-[100%] items-center '>
        <div className=''>
          <p className='text-lg sm:text-2xl font-bold'>Product Category</p>

        <Select
          value={productData.category}
          inputProps={{ 'aria-label': 'Without label' }}
          sx={{width:"100%", color:"black"}}
          required
          onChange={handleChange} name="category"
        >
          <MenuItem value="none">
            <em>None</em>
          </MenuItem>
          <MenuItem value="Salad">Salad</MenuItem>
          <MenuItem value="Rolls">Rolls</MenuItem>
          <MenuItem value="desserts">Deserts</MenuItem>
          <MenuItem value="Sandwich">Sandwich</MenuItem>
          <MenuItem value="Pure Veg">Pure Veg</MenuItem>
          <MenuItem value="Pasta">Pasta</MenuItem>
          <MenuItem value="Cake">Cake</MenuItem>
          <MenuItem value="Noodels">Noodels</MenuItem>
        </Select>
        </div>

        <div className=''>
          <p className='text-lg sm:text-2xl font-bold'>Product Price</p>
          <TextField variant='outlined' type='number'
          required
          onChange={handleChange} name="price" value={productData.price} 
           sx={{fontSize:"24px"}} />
        </div>
        </div>

        <Button type="submit" disabled={loading} sx={{width: "40%", padding:"10px 0", backgroundColor:"orangered" , color: "white"}}>Add</Button>
      </form>
    </div>
  )
}

export default AdminAdd