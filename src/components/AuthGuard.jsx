import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';

export default function AuthGuard() {
    const token=useSelector((state)=>state.user.token);
  return token? <Outlet/> : <Navigate to='/signin/login' replace/>;
}
