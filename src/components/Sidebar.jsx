import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = ({isMenuOpen, setIsMenuOpen}) => {
  return (
    <div className={`w-[200px] h-full top-0 left-0 z-20 bg-[#efe6e0] ${isMenuOpen ? "fixed translate-x-500" : "fixed -translate-x-full"} transition-transform duration-300`}>
         <ul
        className={` flex flex-col gap-4 mt-4 px-4`}
         >
        <p onClick={()=> setIsMenuOpen(false)} 
            className='ml-auto cursor-pointer text-[24px]'>X</p>
        <li className="relative text-lg px-4 py-2 text-center cursor-pointer group">
          Home
          <span
              className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-[#a6a6a6] transition-all duration-300 group-hover:w-full group-hover:left-0"
            ></span>
          </li>

          <Link to="/cart" className="relative text-lg px-4 py-2 text-center cursor-pointer  group">
          cart
          <span
              className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-[#a6a6a6] transition-all duration-300 group-hover:w-full group-hover:left-0"
            ></span>
          </Link>

          <a href="#contact"  className="relative text-lg px-4 py-2 text-center cursor-pointer  group">
          contact us
          <span
              className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-[#a6a6a6] transition-all duration-300 group-hover:w-full group-hover:left-0"
            ></span>
          </a>
      </ul>
    </div>
  )
}

export default Sidebar