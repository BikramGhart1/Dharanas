import React, { useContext, useEffect, useState } from 'react'
import { Searchbar } from "./Partials/Navbar"
import { NavLink, Outlet, useNavigate, useParams } from 'react-router-dom';
import { useFollowers } from '../contexts/FollowersContext';
import { useSelector } from 'react-redux';

let isFullLength = true;

export default function Followee() {
    const navigate = useNavigate()
    const { uid } = useParams();
    const {fetchData, getFollowListType, type, page}=useFollowers();
    const {followers,following}=useSelector((state)=>state.user.social)
    console.log('type in followee comp: ',type);
    useEffect(() => {
        fetchData();
    }, [uid, followers.pagination.page,following.pagination.page, page])


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
                    <Searchbar isFullLength={isFullLength} type={type} uid={uid}/>
                </div>
                <Outlet context={{getFollowListType }} />
                <button onClick={() => { navigate(-1) }} className="absolute right-5 top-1/5 -translate-y-1/2 p-1 px-2 rounded-none hover:bg-gray-400 transition-all ease-in">
                    <i className="fas fa-times text-lg text-primary font-bold hover:text-emphasis hover:scale-105 cursor-pointer transition-all ease-in"></i>
                </button>
            </div>
        </div>

    )
}
