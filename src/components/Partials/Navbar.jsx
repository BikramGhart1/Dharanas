import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';


export const Searchbar = ({ isFullLength, type = null, uid = null }) => {

  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    const searchLogic = async (e) => {
      if (!searchText.trim()) {
        setSearchResult([]);
        return
      }

      try {
        const headers = { Authorization: `Bearer ${token}` };
        let endpoint = '';
        if (type) {
          console.log("type: ",type);
          if (uid) {
            endpoint = `https://dharanas-backend-deployment.onrender.com/user/search/${type}/${uid}?query=${searchText}`;
          } else {
            endpoint = `https://dharanas-backend-deployment.onrender.com/user/search/${type}?query=${searchText}`;
          }
        } else {
          endpoint = `https://dharanas-backend-deployment.onrender.com/user/search?query=${searchText}`;
        }
        const response = await axios.get(endpoint, { headers });
        setSearchResult(response.data.data);
        console.log('search result :', response.data.data);
      } catch (err) {
        console.error("error searching user: ", err);
        setSearchResult([])
      }

    }

    const debounceTimer = setTimeout(searchLogic, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchText])


  const clearSearchText = () => {
    setSearchText('');
  }

  const clearSearchResult = () => {
    console.log('clearing search results');
    clearSearchText();
    setSearchResult([]);
  }
  const onInputChange = (e) => {
    setSearchText(e.target.value);
  }

  return <div className={`relative ${isFullLength ? `w-full` : `w-2/5`} flex flex-col space-y-5 `}>
    {/* Search Input */}
    <div className={`relative  mx-auto w-full`}>
      <input
        type="text"
        name="search"
        id="search"
        placeholder="Search Users..."
        className="w-full pl-5 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
        onChange={onInputChange}
        autoComplete='off'
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
    <div className={`absolute top-3/4 ${searchResult.length > 0 ? 'flex flex-col' : `hidden`} bg-background bg-opacity-95 py-4 px-4 rounded-lg gap-y-2 w-full`}>
      {
        searchResult.length > 0 && (searchResult.map((user) => {
          return (
            <Link to={`/users/${user.uid}`} onClick={clearSearchResult} className='flex flex-row justify-start items-center gap-x-6 cursor-pointer mb-2 py-3 border-b-emphasis border-b rounded-lg px-2 hover:bg-background-secondary' key={user.uid}>
              {
                user.profile_picture ? (
                  <img src={user?.profile_picture} className='smallPfp' alt="pfp" />
                ) : (
                  <img src='/images/guest.png' className='smallPfp' alt='pfp' />
                )
              }
              <p className=''>{user?.username}</p>
            </Link>
          )
        }))
      }
    </div>
    {
      searchResult.length === 0 && searchText.length > 2 && <p className='absolute top-3/4 w-full bg-background bg-opacity-85 py-2 px-4 text-center'>No users found</p>
    }
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
  let isFullLength = false;


  return (
    <nav className={`fixed w-full z-50 top-0 flex justify-between items-center bg-secondary text-text px-6 py-4 shadow-lg transition-all duration-200`}>
      <Link to='/' className="text-2xl font-bold tracking-wide">
        DHARANAS
      </Link>

      <Searchbar isFullLength={isFullLength} />

      <div className="flex items-center space-x-4">
        <p className="text-lg font-medium hover:text-gray-400 transition">
          {userInfo?.username}
        </p>
        <Link to={`/profile`} className='cursor-pointer'>
          <img
            src={profile_picture ? profile_picture : "/images/guest.png"}
            alt="User Avatar"
            className="smallPfp"
          />
        </Link>
      </div>
    </nav>
  );

}
