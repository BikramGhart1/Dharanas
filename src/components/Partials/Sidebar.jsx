import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../../../store/userSlice';

export default function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logOutWindow, setLogoutWindow] = useState(false);

  const LogoutHandler = () => {
    console.log('logging out');
    dispatch(logout());
    navigate('/signin/login');
  }

  const ConfirmLogout = () => {
    return <div className='w-screen bg-opacity-50 z-[1000] fixed top-0 right-0 left-0 h-screen flex justify-center items-center'>
      <div className='bg-background-secondary p-32 rounded-2xl bg-opacity-95 flex flex-col gap-y-4'>
        <p>Are you sure you want to Logout?</p>
        <div className='flex flex-row justify-start gap-x-10'>
          <button onClick={LogoutHandler} className='bg-red-400 px-4 py-1 rounded-lg hover:bg-red-500 active:bg-red-600'>Yes</button>
          <button onClick={() => { setLogoutWindow(false) }} className='bg-primary px-4 py-1 rounded-lg hover:bg-emphasis active:bg-active'>No</button>
        </div>
      </div>
    </div>
  }
  return (
    <aside className='leftSidebar'>
      <div className='flex flex-col border-b border-solid border-border my-4 py-3'>
        <h3 className='font-semibold pb-2'>General options</h3>
        <Link to='/'>Home</Link>
        <Link to='/createPost'>Create Post</Link>
        <a href="#">Notifications</a>
        <a href="#">Dummy</a>
      </div>
      <div className='flex flex-col items-start border-b border-solid border-border my-4 py-3'>
        <h3 className='font-semibold pb-2'>User options</h3>
        <Link to='/profile'>Profile</Link>
        <Link to='/profile/saved'>Saved</Link>
        <Link to='/profile/comments'>Comments</Link>
      </div>
      <div className='flex flex-col items-start border-b border-solid border-border my-4 py-3'>
        <h3 className='font-semibold pb-2 text-red-400'>Danger Zone</h3>
        <button onClick={() => { setLogoutWindow(true) }} className=''>Logout</button>
        {
          logOutWindow &&
          <ConfirmLogout />
        }
        <button>Delete Account</button>

      </div>
    </aside>
  )
}
