import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function HomePage() {
  const [userDetails, setUserDetails] = useState(null);
  const getUserDetails = async () => {
    try {
      const token = localStorage.getItem('token');
      const user = await axios.get('http://localhost:3000/user/userDetails', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
      )
      const userData=user.data.user;
      console.log(user);
      setUserDetails(userData);
    } catch (err) {
      console.error("Error while fetching user data: ", err);
    }
  }
  useEffect(() => {
    getUserDetails();
  }, [])
  return (
    <div className='text-text bg-background min-h-svh flex justify-center items-center'>
      {userDetails?(
        <p>Welcome {userDetails.username}</p>
      ):(
        <p>Loading....</p>
      )} 
    </div>
  )
}
