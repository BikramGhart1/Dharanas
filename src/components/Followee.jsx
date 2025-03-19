import React, { useEffect, useState } from 'react'
import { Searchbar } from "./Partials/Navbar"
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';

let isFullLength = true;

export const Followers = () => {
    const [dummyUsers, setDummyUsers] = useState([
        {username:" Test"}
    ]);
    const fetchFollowers = async () => {
        const token = localStorage.getItem('token')
        const result = await axios.get(`http://localhost:3000/user/showFollowers`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
        console.log(result.data);
        const data = result.data.data;
        setDummyUsers(data);
        console.log("Dummy users: ",dummyUsers)
        // setDummyUsers((prev) => ({ ...prev, ...data }))
    }
    useEffect(() => {
        fetchFollowers();
    }, [])
    return (

        <div className="w-full flex flex-col overflow-y-auto gap-y-4">
            {

              dummyUsers.length>0 &&  dummyUsers.map((user, index) => {
                    return (
                        <div key={index} className="bg-secondary px-4 py-2 rounded-xl mr-2 flex flex-row justify-between items-center">
                            <div className="flex flex-row justify-start items-center gap-x-5">
                                <img className="w-1/5 aspect-square rounded-full" src="/images/guest.png" alt="" />
                                <p className="text-primary">{user.username}</p>
                            </div>
                            <button>...</button>
                        </div>)
                })
            }
            <div className="bg-secondary px-4 py-2 rounded-xl mr-2 flex flex-row justify-between items-center">
                <div className="flex flex-row justify-start items-center gap-x-5">
                    <img className="w-1/5 aspect-square rounded-full" src="/images/guest.png" alt="" />
                    <p className="text-primary">Namu</p>
                </div>
                <button>...</button>
            </div>
            <div className="bg-secondary px-4 py-2 rounded-xl mr-2 flex flex-row justify-between items-center">
                <div className="flex flex-row justify-start items-center gap-x-5">
                    <img className="w-1/5 aspect-square rounded-full" src="/images/guest.png" alt="" />
                    <p>Krishna</p>
                </div>
                <button>...</button>
            </div>
            <div className="bg-secondary px-4 py-2 rounded-xl mr-2 flex flex-row justify-between items-center">
                <div className="flex flex-row justify-start items-center gap-x-5">
                    <img className="w-1/5 aspect-square rounded-full" src="/images/guest.png" alt="" />
                    <p>Blas </p>
                </div>
                <button>...</button>
            </div>
            <div className="bg-secondary px-4 py-2 rounded-xl mr-2 flex flex-row justify-between items-center">
                <div className="flex flex-row justify-start items-center gap-x-5">
                    <img className="w-1/5 aspect-square rounded-full" src="/images/guest.png" alt="" />
                    <p>Ramu</p>
                </div>
                <button>...</button>
            </div>
            <div className="bg-secondary px-4 py-2 rounded-xl mr-2 flex flex-row justify-between items-center">
                <div className="flex flex-row justify-start items-center gap-x-5">
                    <img className="w-1/5 aspect-square rounded-full" src="/images/guest.png" alt="" />
                    <p>Ramu</p>
                </div>
                <button>...</button>
            </div>
            <div className="bg-secondary px-4 py-2 rounded-xl mr-2 flex flex-row justify-between items-center">
                <div className="flex flex-row justify-start items-center gap-x-5">
                    <img className="w-1/5 aspect-square rounded-full" src="/images/guest.png" alt="" />
                    <p>Ramu</p>
                </div>
                <button>...</button>
            </div>
            <div className="bg-secondary px-4 py-2 rounded-xl mr-2 flex flex-row justify-between items-center">
                <div className="flex flex-row justify-start items-center gap-x-5">
                    <img className="w-1/5 aspect-square rounded-full" src="/images/guest.png" alt="" />
                    <p>Ramu</p>
                </div>
                <button>...</button>
            </div>
        </div>
    )
}
export const Following = () => {
    return (
        <div className="w-full flex flex-col overflow-y-auto gap-y-4">
            <div className="bg-secondary px-4 py-2 rounded-xl mr-2 flex flex-row justify-between items-center">
                <div className="flex flex-row justify-start items-center gap-x-5">
                    <img className="w-1/5 aspect-square rounded-full" src="/images/guest.png" alt="" />
                    <p className="text-primary">Ramu</p>
                </div>
                <button>...</button>
            </div>
            <div className="bg-secondary px-4 py-2 rounded-xl mr-2 flex flex-row justify-between items-center">
                <div className="flex flex-row justify-start items-center gap-x-5">
                    <img className="w-1/5 aspect-square rounded-full" src="/images/guest.png" alt="" />
                    <p>Ramu</p>
                </div>
                <button>...</button>
            </div>
            <div className="bg-secondary px-4 py-2 rounded-xl mr-2 flex flex-row justify-between items-center">
                <div className="flex flex-row justify-start items-center gap-x-5">
                    <img className="w-1/5 aspect-square rounded-full" src="/images/guest.png" alt="" />
                    <p>Ramu</p>
                </div>
                <button>...</button>
            </div>
            <div className="bg-secondary px-4 py-2 rounded-xl mr-2 flex flex-row justify-between items-center">
                <div className="flex flex-row justify-start items-center gap-x-5">
                    <img className="w-1/5 aspect-square rounded-full" src="/images/guest.png" alt="" />
                    <p>Ramu</p>
                </div>
                <button>...</button>
            </div>
            <div className="bg-secondary px-4 py-2 rounded-xl mr-2 flex flex-row justify-between items-center">
                <div className="flex flex-row justify-start items-center gap-x-5">
                    <img className="w-1/5 aspect-square rounded-full" src="/images/guest.png" alt="" />
                    <p>Ramu</p>
                </div>
                <button>...</button>
            </div>
            <div className="bg-secondary px-4 py-2 rounded-xl mr-2 flex flex-row justify-between items-center">
                <div className="flex flex-row justify-start items-center gap-x-5">
                    <img className="w-1/5 aspect-square rounded-full" src="/images/guest.png" alt="" />
                    <p>Ramu</p>
                </div>
                <button>...</button>
            </div>
            <div className="bg-secondary px-4 py-2 rounded-xl mr-2 flex flex-row justify-between items-center">
                <div className="flex flex-row justify-start items-center gap-x-5">
                    <img className="w-1/5 aspect-square rounded-full" src="/images/guest.png" alt="" />
                    <p>Ramu</p>
                </div>
                <button>...</button>
            </div>
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
