import React from 'react'
import { Searchbar } from "./Partials/Navbar"
import { NavLink, Outlet } from 'react-router-dom';

let isFullLength = true;

export const Followers=()=>{
    return (
       
        <div className="w-full flex flex-col overflow-y-auto gap-y-4">
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
export const Following=()=>{
    return(
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

export default function Followee({toggleOpenFollowee}) {
    return (
        <div className="fixed top-0 left-0 flex justify-center items-center bg-opacity-10 bg-black h-screen w-screen">
            <div className="mt-20 h-3/5 w-3/4 md:w-1/3 py-6 relative bg-background-secondary p-5 overflow-x-hidden rounded-3xl rounded-tr-none flex flex-col gap-y-5">
                <div>
                    <div className="flex flex-row justify-around mb-4">
                        <NavLink to='followers' replace className={({isActive})=>`text-center mb-2 font-semibold cursor-pointer ${isActive?`border-b-4 border-primary border-solid`:` border-none`} `}>Followers</NavLink>
                        <NavLink to='following' replace className={({isActive})=>`text-center mb-2 font-semibold cursor-pointer ${isActive?`border-b-4 border-primary border-solid`:` border-none`} `}>Following</NavLink>
                    </div>
                    <Searchbar isFullLength={isFullLength} />
                </div>
                <Outlet/>
                <button onClick={() => { toggleOpenFollowee() }} className="absolute right-5 top-1/5 -translate-y-1/2 p-1 px-2 rounded-none hover:bg-gray-400 transition-all ease-in">
                    <i className="fas fa-times text-lg text-primary font-bold hover:text-emphasis hover:scale-105 cursor-pointer transition-all ease-in"></i>
                </button>
            </div>
        </div>

    )
}
