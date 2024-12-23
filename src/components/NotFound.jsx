import React from 'react'
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className='min-h-[42vh] w-full'>
           <div className='mt-20 flex flex-col gap-4 w-[70%] sm:w-[70%] mx-auto'>
           <p className='text-2xl sm:text-3xl lg:text-4xl'>Page Not Found...</p>
            
            <Link to="/">
            <Button variant="contained" color='primary' sx={{fontSize:{lg:"24px", sm:"20px"}}}>
                Home
            </Button>
            </Link>
           </div>
    </div>
  )
}

export default NotFound