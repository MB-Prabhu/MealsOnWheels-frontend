import React from 'react'
import { assets } from '../assets/assets/frontend_assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <>
      <footer id='contact' className='py-4 w-full flex flex-col justify-center items-center bg-[#252525] text-white'>
        <div className='w-[90%] flex flex-col sm:flex-row gap-6 py-4 justify-center items-start sm:justify-between border-[#676767] border-b-2 '>
            <div className='sm:w-[30%]'>
             <img src={assets.logo} alt="" className='w-[60%]'/>
             <p className='mt-2 leading-5'>our Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam at officia, officiis quibusdam perferendis facere impedit veniam corrupti aut ipsa ex dolore fugit fuga mollitia, cum ducimus natus temporibus pariatur.</p>

           <div className='flex gap-2 mt-4'>
               <img src={assets.facebook_icon} alt="" className='w-10 h-10' />
               <img src={assets.twitter_icon} alt=""  className='w-10 h-10'/>
               <img src={assets.linkedin_icon} alt="" className='w-10 h-10' />
           </div>   
           </div>

           <div className='sm:w-[30%] '>
            <h2 className=' text-2xl lg:text-2xl font-bold'>Company</h2>
            <ul className='mt-2 list-none flex flex-col'>
                <Link to='/' className="sm:text-sm text-lg list-none text-[#676767]">Home</Link>
                {/* <Link className="sm:text-sm text-lg list-none text-[#676767]">Menu</Link> */}
                <a href='#contact' className="sm:text-sm text-lg list-none text-[#676767]">Contact Us</a>
            </ul>
        </div>

         <div className='sm:w-[30%]'>
            <h2 className='text-2xl lg:text-2xl font-bold'>Get in Touch</h2>
            <p className='sm:text-sm text-lg mt-3 text-[#676767]'>Ph no: +91 918273645</p>
            <p className='sm:text-sm text-lg text-[#676767]'>mealsonwheels@gmail.com</p>
        </div>
        </div>
       

       
        <div className='mx-auto mt-4 w-[90%] text-white'>
    <p className='text-center'>Copyright @{new Date().getFullYear()} © Meals on Wheels - All Rights Reserved</p>
    </div>
       
    </footer>

   
    </>
  
  )
}

export default Footer