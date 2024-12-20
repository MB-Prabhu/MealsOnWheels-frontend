import React, { useState } from 'react'
import { assets } from '../assets/assets/admin_assets/assets'
import { TextField, Button, MenuItem, Select, InputLabel } from '@mui/material';
import { toast } from 'react-toastify';
import axios  from 'axios';

const AdminAdd = () => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const[imageUpload, setImageUpload] = useState(null)
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
        let {data} = await axios.post(`${apiUrl}/api/createfood`,formData)
        console.log(data)
        if(data.ok){
          setProductData({
            name:"",
            description:"",
            price:"",
            category:"Salad"
          })
          setImageUpload(null)
          // toast.success('Added Successfully', {
          //   position: "top-right",
          //   autoClose: 3000,
          //   hideProgressBar: false,
          //   closeOnClick: false,
          //   pauseOnHover: true,
          //   draggable: true,
          //   progress: undefined,
          //   theme: "dark",
          //   });
          toast.success(data.msg, {
            autoClose: 2000
          })
        }

      }
      catch(err){
        toast.warning(err.response.data?.msg,  {
          autoClose: 2000
        })
      }
  }

  return (
    <div className='px-2 border border-black w-[100%] sm:w-[70%] lg:w-[75%] xl:w-[80%]'>
      <form onSubmit={handleSubmit} className='px-4 w-full py-4 flex flex-col gap-6'>
        <div className=''>
          <p className='text-lg sm:text-2xl font-bold'>upload image</p>
          <label htmlFor="imgupload">
          <img src={imageUpload ? URL.createObjectURL(imageUpload) : assets.upload_area} alt="" className='my-2 w-40 h-24 bg-contain border border-black' />
          </label>
          <input type="file" id='imgupload' hidden onChange={(e)=> setImageUpload(e.target.files[0])}/>
        </div>

        <div className=''>
          <p className='text-lg sm:text-2xl font-bold'>Product Name</p>
          <TextField variant='outlined' onChange={handleChange} name="name"  value={productData.name} sx={{height: "40px", fontSize:"44px", margin:"5px 0"}}/>
        </div>

        <div className=''>
          <p className='text-lg sm:text-2xl font-bold'>Product Description</p>
          <TextField variant='outlined' onChange={handleChange} name="description" value={productData.description} rows={7}  sx={{height: "40px", fontSize:"44px", margin:"5px 0"}} />
        </div>

        <div className='flex gap-4 w-[100%] items-center '>
        <div className=''>
          <p className='text-lg sm:text-2xl font-bold'>Product Category</p>
          {/* <InputLabel id="demo-simple-select-helper-label">Select 
          Category</InputLabel> */}
        {/* <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          label="Age"
          sx={{width:"100%", color:"black"}}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select> */}

        <Select
          value={productData.category}
          //  label="Age"
          // displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
          sx={{width:"100%", color:"black"}}
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
          onChange={handleChange} name="price" value={productData.price} 
           sx={{fontSize:"24px"}} />
        </div>
        </div>

        <Button type="submit" sx={{width: "40%", padding:"10px 0", backgroundColor:"orangered" , color: "white"}}>Add</Button>
      </form>
    </div>
  )
}

export default AdminAdd