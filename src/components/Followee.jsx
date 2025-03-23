import React, { useEffect, useState } from 'react'
import { Searchbar } from "./Partials/Navbar"
import { NavLink, Outlet, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

let isFullLength = true;

export default function Followee() {
    const navigate = useNavigate()
    const [followers, setFollowers] = useState([]);
    const [followings, setFollowings] = useState([]);
    const { userInfo } = useSelector((state) => state.user);
    const { uid } = useParams();

    const token = localStorage.getItem('token');

    const fetchFollowersURL = uid ?
        `http://localhost:3000/user/showFollowers/${uid}` :
        `http://localhost:3000/user/showFollowers`;

    const fetchFollowingsURL = uid ?
        `http://localhost:3000/user/showFollowings/${uid}` :
        `http://localhost:3000/user/showFollowings`;

    const fetchData = async () => {
        try {

            const [followersRes, followingRes] = await Promise.all([
                axios.get(fetchFollowersURL,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }),
                axios.get(fetchFollowingsURL,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            ]);
    console.log('followers response: ', followersRes);
    console.log('following response: ', followingRes);
    setFollowers(followersRes.data.data);
    setFollowings(followingRes.data.data);
} catch (err) {
    console.error("An error occurred fetching followers and following ", err);
}
    }

useEffect(() => {
    fetchData();
}, [uid])
return (
    <div onClick={(e) => {
        if (e.target === e.currentTarget) {
            navigate(-1);
        }
    }} className="fixed top-0 left-0 flex justify-center items-center bg-opacity-10 bg-black h-screen w-screen">
        <div onClick={(e) => { e.stopPropagation() }} className="mt-20 h-3/5 w-3/4 md:w-1/3 py-6 relative bg-background-secondary p-5 overflow-x-hidden rounded-3xl rounded-tr-none flex flex-col gap-y-5">
            <div>
                <div className="flex flex-row justify-around mb-4">
                    <NavLink to='followers' end replace className={({ isActive }) => `text-center mb-2 font-semibold cursor-pointer ${isActive ? `border-b-4 border-primary border-solid` : ` border-none`} `}>Followers</NavLink>
                    <NavLink to='following' end replace className={({ isActive }) => `text-center mb-2 font-semibold cursor-pointer ${isActive ? `border-b-4 border-primary border-solid` : ` border-none`} `}>Following</NavLink>
                </div>
                <Searchbar isFullLength={isFullLength} />
            </div>
            <Outlet context={{ followers, followings }} />
            <button onClick={() => { navigate(-1) }} className="absolute right-5 top-1/5 -translate-y-1/2 p-1 px-2 rounded-none hover:bg-gray-400 transition-all ease-in">
                <i className="fas fa-times text-lg text-primary font-bold hover:text-emphasis hover:scale-105 cursor-pointer transition-all ease-in"></i>
            </button>
        </div>
    </div>

)
}
