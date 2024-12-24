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
             <p className='mt-2 leading-5'>Meal On Wheels is a online food ordering platform, which is providing great user experience and a way to order food online, including wide range of food varieties and offers and a lot more. Users have got great experience by using our product, and our team is working on to provide a more user friendly experience and new features  </p>

           <div className='flex gap-2 mt-4'>
              <a href="https://www.twitter.com" target='_blank' rel="noopener noreferrer"> <img src={assets.facebook_icon} alt="" className='w-10 h-10' /> </a>
              <a href="https://www.linkedin.com" target='_blank' rel="noopener noreferrer"> <img src={assets.twitter_icon} alt=""  className='w-10 h-10'/> </a>
              <a href="https://www.facebook.com"  target='_blank' rel="noopener noreferrer"> <img src={assets.linkedin_icon} alt="" className='w-10 h-10' /></a>
           </div>   
           </div>

           <div className='sm:w-[30%] '>
            <h2 className=' text-2xl lg:text-2xl font-bold'>Company</h2>
            <ul className='mt-2 list-none flex flex-col'>
                <Link to='/' className="sm:text-sm text-lg list-none text-[#676767]">Home</Link>
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
    <p className='text-center'>Copyright © {new Date().getFullYear()}  MealsOnWheels. All Rights Reserved</p>
    </div>
       
    </footer>

   
    </>
  
  )
}

export default Footer