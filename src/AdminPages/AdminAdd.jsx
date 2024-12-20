import React from 'react'
import { assets } from '../assets/assets/admin_assets/assets'
import { TextField, Button, MenuItem, Select, InputLabel } from '@mui/material';

const AdminAdd = () => {
  return (
    <div className='px-2 border border-black w-[100%] sm:w-[70%] lg:w-[75%] xl:w-[80%]'>
      <div className='px-4 w-full py-4 flex flex-col gap-6'>
        <div className=''>
          <p className='text-lg sm:text-2xl font-bold'>upload image</p>
          <img src={assets.upload_area} alt="" className='block my-2' />
        </div>

        <div className=''>
          <p className='text-lg sm:text-2xl font-bold'>Product Name</p>
          <TextField variant='outlined' sx={{height: "40px", fontSize:"44px", margin:"5px 0"}}/>
        </div>

        <div className=''>
          <p className='text-lg sm:text-2xl font-bold'>Product Description</p>
          <TextField variant='outlined' rows={7}  sx={{height: "40px", fontSize:"44px", margin:"5px 0"}} />
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
          // value={none}
          // onChange={handleChange}
          //  label="Age"
          // displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
          sx={{width:"100%", color:"black"}}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        </div>

        <div className=''>
          <p className='text-lg sm:text-2xl font-bold'>Product Price</p>
          <TextField variant='outlined' type='number' sx={{fontSize:"24px"}} />
        </div>
        </div>

        <Button sx={{width: "40%", padding:"10px 0", backgroundColor:"orangered" , color: "white"}}>Add</Button>
      </div>
    </div>
  )
}

export default AdminAdd