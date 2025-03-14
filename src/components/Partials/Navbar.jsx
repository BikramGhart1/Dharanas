import { Search } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

export default function Navbar() {
  const { userInfo } = useSelector((state) => state.user)
  const profile_picture = userInfo?.profile_picture || null;
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
      <Link to='/' className="text-2xl font-bold tracking-wide">
        DHARANAS
      </Link>
      <div className='flex-1 mx-60 relative'>
        
        <input
          type="text"
          placeholder="Search users..."
          className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
        />
      </div>
      <div className="flex items-center space-x-4">
        <p className="text-lg font-medium hover:text-gray-400 transition">
          {userInfo?.username}
        </p>
        <Link to='/profile' className='cursor-pointer'>
          <img
            src={profile_picture ? profile_picture : "https://avatars.githubusercontent.com/u/132071114?v=4"}
            alt="User Avatar"
            className="w-12 h-12 object-cover overflow-hidden rounded-full border-2 border-gray-500 hover:scale-105 transition duration-300"
          />
        </Link>
      </div>
    </nav>
  );

}
