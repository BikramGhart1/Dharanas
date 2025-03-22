import React, { useEffect, useState } from 'react'
import { Searchbar } from "./Partials/Navbar"
import { NavLink, Outlet, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

let isFullLength = true;

export const Followers = () => {

    const [userFollowers, setUserFollowers] = useState([
        { username: " Test" }
    ]);
    const { uid } = useParams();
    const userId=uid || useSelector((state)=>state.user.userInfo.uid);

    const fetchFollowers = async () => {
        const token = localStorage.getItem('token')
        const result = await axios.get(`http://localhost:3000/user/showFollowers/${userId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
        console.log(result.data);
        const data = result.data.data;
        setUserFollowers(data);
        console.log("Dummy users: ", userFollowers)
    }
    useEffect(() => {
        fetchFollowers();
    }, [])
    return (

        <div className="w-full flex flex-col overflow-y-auto gap-y-4">
            {

                userFollowers.length > 0 && userFollowers.map((user, index) => {
                    return (
                        <div key={index} className="bg-secondary px-4 py-2 rounded-xl mr-2 flex flex-row justify-between items-center">
                            <div className="flex flex-row justify-start items-center gap-x-5">
                                {
                                    user.profile_picture ? (
                                        <img src={user?.profile_picture} alt='pfp' />
                                    ) : (
                                        <img className="w-1/5 aspect-square rounded-full" src="/images/guest.png" alt="" />
                                    )
                                }
                                <p className="text-primary">{user.username}</p>
                            </div>
                            <button>...</button>
                        </div>)
                })
            }

        </div>
    )
}
export const Following = () => {
    const [userFollowings, setUserFollowings] = useState([
        {
            username: 'test'
        }
    ]);

    const { uid } = useParams();
    const userId=uid || useSelector((state)=>state.user.userInfo.uid);

    const fetchFollowings = async () => {
        const token = localStorage.getItem('token')

        const result = await axios.get(`http://localhost:3000/user/showFollowings/${userId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
        console.log('following: ', result.data);
        const data = result.data.data;
        setUserFollowings(data);
    }
    useEffect(() => {
        fetchFollowings();
    }, [])
    return (
        <div className="w-full flex flex-col overflow-y-auto gap-y-4">
            {
                userFollowings.length > 0 && userFollowings.map((user, index) => {
                    return (
                        <div key={index} className="bg-secondary px-4 py-2 rounded-xl mr-2 flex flex-row justify-between items-center">
                            <div className="flex flex-row justify-start items-center gap-x-5">
                                {
                                    user.profile_picture ? (
                                        <img src={user?.profile_picture} alt='pfp' />
                                    ) : (
                                        <img className="w-1/5 aspect-square rounded-full" src="/images/guest.png" alt="" />
                                    )
                                }
                                <p className="text-primary">{user.username}</p>
                            </div>
                            <button>...</button>
                        </div>)
                })
            }

        </div>
    )
}

export default function Followee() {
    const navigate = useNavigate()
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
                <Outlet />
                <button onClick={() => { navigate(-1) }} className="absolute right-5 top-1/5 -translate-y-1/2 p-1 px-2 rounded-none hover:bg-gray-400 transition-all ease-in">
                    <i className="fas fa-times text-lg text-primary font-bold hover:text-emphasis hover:scale-105 cursor-pointer transition-all ease-in"></i>
                </button>
            </div>
        </div>

    )
}
