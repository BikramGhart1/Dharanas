import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser } from '../../store/userSlice';


export default function HomePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const { userInfo, status, error } = useSelector((state) => state.user);
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
    <div className='text-text bg-background min-h-svh '>
      {userInfo ? (
        <p>Welcome {userInfo.username}</p>
      ) : (
        <div className='min-h-svh flex justify-center items-center'>
          <p>{status}</p>
        </div>
      )}
    </div>
  )
}
