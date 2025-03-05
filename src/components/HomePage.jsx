import axios from 'axios';
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
      navigate('/login');
    }
  }, [error, navigate]);

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
