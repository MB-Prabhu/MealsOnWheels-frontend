import React from 'react'

const Sidebar = ({isMenuOpen, setIsMenuOpen}) => {
  return (
    <div className={`w-[200px] h-full top-0 left-0 z-20 bg-[#eabb94] ${isMenuOpen ? "fixed translate-x-500" : "fixed -translate-x-full"} transition-transform duration-300`}>
         <ul
        className={` flex flex-col gap-4 mt-4 px-4`}
         >
        <p onClick={()=> setIsMenuOpen(false)} 
            className='ml-auto cursor-pointer text-[24px]'>X</p>
        <li className="px-4 py-2 hover:bg-gray-700 text-center border-[#676767] border-b-2">Home</li>
        <li className="px-4 py-2 hover:bg-gray-700 text-center border-[#676767] border-b-2">Menu</li>
        <li className="px-4 py-2 hover:bg-gray-700 text-center border-[#676767] border-b-2">Contact Us</li>
        <li className="px-4 py-2 hover:bg-gray-700 text-center border-[#676767] border-b-2">About Us</li>
      </ul>
    </div>
  )
}

export default Sidebar