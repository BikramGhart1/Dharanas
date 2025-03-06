import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function Navbar() {
  const { userInfo } = useSelector((state) => state.user)
  const [isSticky,setIsSticky]=useState(false);

  useEffect(()=>{
  const scrollHandler=()=>{
    if(window.scrollY>20){
       setIsSticky(true);
    }else{
       setIsSticky(false);
    }
  }
  window.addEventListener('scroll',scrollHandler);
  return ()=> window.removeEventListener('scroll',scrollHandler);
},[])
  return (
        <nav className={`${isSticky?"fixed w-full top-0 shadow-md":"fixed top-4 w-[90%] ml-[5%] rounded-lg"} flex justify-between items-center bg-background-secondary text-text px-6 py-4 shadow-lg transition-all duration-200`}>
          <div className="text-2xl font-bold tracking-wide">
            DHARANAS
          </div>
    
          <div className="flex items-center space-x-4">
            <p className="text-lg font-medium hover:text-gray-400 transition">
              {userInfo?.username}
            </p>
    
            <img
              src="https://avatars.githubusercontent.com/u/132071114?v=4"
              alt="User Avatar"
              className="w-12 h-12 rounded-full border-2 border-gray-500 hover:scale-105 transition duration-300"
            />
          </div>
        </nav>
      );
   
}
