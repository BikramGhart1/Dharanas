import { Link, useParams } from 'react-router-dom';
import React, { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { useSelector } from 'react-redux';

export default function FollowList({ type }) {
    const { followers, followings, incrementPage, hasMore, getFollowListType } = useOutletContext();
    const { uid } = useParams();
    const followersRedux = useSelector((state) => state.user.social.followers.users);
    const followingsRedux = useSelector((state) => state.user.social.following.users);
    const userList = uid ? (type === 'followers' ?followersRedux : followingsRedux) :(type === 'followers' ? followers : followings);
    useState(() => {
        getFollowListType(type);
    }, [type])
    return (
        <div className="w-full flex flex-col overflow-y-auto gap-y-4">
            {
                userList.length > 0 && userList.map((user, index) => {
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
                })
            }{
                hasMore &&
                <button className='text-text-secondary' onClick={incrementPage}>Load More</button>
            }
        </div>
    )
}
