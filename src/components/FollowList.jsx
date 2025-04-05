import { Link, useParams } from 'react-router-dom';
import React, { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { useSelector } from 'react-redux';
import {useFollowers } from '../contexts/FollowersContext';

export default function FollowList({ type }) {
    const {getFollowListType } = useOutletContext();
    const {followers,followings,incrementPage}=useFollowers();
    const { uid } = useParams();
    const followersRedux = useSelector((state) => state.user.social.followers.users);
    const followingsRedux = useSelector((state) => state.user.social.following.users);
    const userList = uid ? (type === 'followers' ? followers.data : followings.data) : (type === 'followers' ? followersRedux : followingsRedux);
    useState(() => {
        getFollowListType(type);
    }, [type])
    return (
        <div className="w-full flex flex-col overflow-y-auto gap-y-4">
            {
                userList.length > 0 ?( userList.map((user, index) => {
                    return (
                        <Link to={`/users/${user.uid}`} key={index} className="bg-secondary px-4 py-2 rounded-xl mr-2 flex flex-row justify-between items-center">
                            <div className="flex flex-row justify-start items-center gap-x-5">
                                {
                                    user.profile_picture ? (
                                        <img className='smallPfp' src={user?.profile_picture} alt='pfp' />
                                    ) : (
                                        <img className="w-1/5 aspect-square rounded-full smallPfp" src="/images/guest.png" alt="" />
                                    )
                                }
                                <p className="text-primary">{user.username}</p>
                            </div>
                            <button>...</button>
                        </Link>)
                })):(
                    <div className='flex flex-col items-center relative overflow-hidden'>
                        <img src="/images/myownbg2.png" className='rounded-full aspect-square object-cover w-1/3 mt-2' alt="empty" />
                    <p className=' px-4 py-2 rounded-xl text-center absolute top-2/4 bg-black bg-opacity-60 font-bold tracking-wider text-lg'>Empty</p>
                    </div>
                )
            }{
                userList.hasMore && userList.length>0 &&
                <button className='text-text-secondary' onClick={incrementPage}>Load More</button>
            }
        </div>
    )
}
