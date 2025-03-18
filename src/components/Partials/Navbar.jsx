import { Search } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

let isFullLength=false;

export const Searchbar = ({isFullLength}) => {

  const [searchText, setSearchText] = useState('');

    const handleSearchInput = (e) => {
        setSearchText(e.target.value);
    }
    const clearSearchText = () => {
      setSearchText('');
    }
    
  return <div className={`relative ${isFullLength?`w-full`:`w-2/5`} mx-auto`}>
  {/* Search Input */}
  <input
    type="text"
    name="search"
    id="search"
    placeholder="Search Users..."
    className="w-full pl-5 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
    onChange={handleSearchInput}
    value={searchText}
  />

  {/* Search Icon Inside Input */}
  <i className="fas fa-search  absolute right-3 top-1/2 -translate-y-1/2 text-lg text-primary font-bold hover:text-emphasis hover:scale-105 cursor-pointer transition-all ease-in"></i>

  {/* Clear Button (Shown Only When There's Text) */}
  {searchText && (
    <button
      className="absolute right-10 top-1/2 -translate-y-1/2 bg-gray-300 p-1 px-2 rounded-none hover:bg-gray-400 transition-all ease-in"
      onClick={clearSearchText}
    >
      <i className="fas fa-times text-lg text-primary font-bold hover:text-emphasis hover:scale-105 cursor-pointer transition-all ease-in"></i>
    </button>
  )}
</div>
}

export const AlternativeSearchBar = () => {
  return <div className='flex-1 mx-60 relative flex flex-row'>

    <input
      type="text"
      placeholder="Search users..."
      className="w-full pl-5 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
    />
    <i className="fas fa-search absolute right-3 top-2 text-lg text-primary font-bold hover:text-emphasis hover:scale-105 cursor-pointer transition-all ease-in"></i>
  </div>
}

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
      <Searchbar isFullLength={isFullLength}/>
      {/* <AlternativeSearchBar/> */}
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
