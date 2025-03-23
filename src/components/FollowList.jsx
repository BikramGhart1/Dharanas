import { Link } from 'react-router-dom';
import React from 'react'
import { useOutletContext } from 'react-router-dom'

export default function FollowList({type}) {
    const{followers,followings}=useOutletContext();
    const userList=type==='followers'?followers:followings;
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
            }

        </div>
  )
}
