import React, { useEffect } from 'react'
import Sidebar from './Partials/Sidebar'
import Navbar from './Partials/Navbar'
import RightSidebar from './Partials/RightSidebar'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import { fetchUser } from '../../store/userSlice'

export default function Layout() {
    const {status,error}=useSelector((state)=>state.user)
    const dispatch=useDispatch();
    const navigate=useNavigate();

    //fetch user gloabally so that when child refresh we can acess from redux
    useEffect(() => {
        dispatch(fetchUser());
      }, [dispatch])
    
      useEffect(() => {
        if (error === "Token expired! please login again") {
          alert(error);
          navigate('/signin/login');
        }
      }, [error, navigate]);

    if (status == 'failed') {
        return <div className='flex justify-center items-center min-h-svh'>
          <p className='bg-red-400 p-3'>Server refused to connect. Please try again later</p>
        </div>
      }
    return (
        <div className='text-text bg-background min-h-svh flex flex-col justify-start items-start w-full'>
            <Navbar />
            <div className='flex flex-row justify-between items-start w-full'>
                <Sidebar />
                <Outlet/>
                <RightSidebar />
            </div>
            {/* <Following/> */}
        </div>
    )
}
