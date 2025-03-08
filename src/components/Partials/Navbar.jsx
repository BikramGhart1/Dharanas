import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

export default function Navbar() {
  const { userInfo } = useSelector((state) => state.user)
  // const [isSticky,setIsSticky]=useState(false);

//   useEffect(()=>{
//   const scrollHandler=()=>{
//     if(window.scrollY>20){
//        setIsSticky(true);
//     }else{
//        setIsSticky(false);
//     }
//   }
//   window.addEventListener('scroll',scrollHandler);
//   return ()=> window.removeEventListener('scroll',scrollHandler);
// },[])
  return (
        <nav className={`fixed w-full z-50 top-0 flex justify-between items-center bg-secondary text-text px-6 py-4 shadow-lg transition-all duration-200`}>
          <div className="text-2xl font-bold tracking-wide">
            DHARANAS
          </div>
    
          <div className="flex items-center space-x-4">
            <p className="text-lg font-medium hover:text-gray-400 transition">
              {userInfo?.username}
            </p>
            <Link to='/profile' className='cursor-pointer'>
            <img
              src="https://avatars.githubusercontent.com/u/132071114?v=4"
              alt="User Avatar"
              className="w-12 h-12 rounded-full border-2 border-gray-500 hover:scale-105 transition duration-300"
            />
            </Link>
          </div>
        </nav>
      );
   
}
