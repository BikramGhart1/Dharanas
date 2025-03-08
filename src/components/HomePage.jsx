import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function HomePage() {
  const dispatch = useDispatch()
  const { userInfo, status, error } = useSelector((state) => state.user);
 
  return (
      <main className='mainContent'>
        {userInfo ? (
          <div className='w-full'>Welcome {userInfo.username}</div>
        ) : (
          <div className='min-h-svh flex justify-center items-center'>
            <p>{status}</p>
          </div>
        )}
      </main>
  )
}
