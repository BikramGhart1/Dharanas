import React, { useContext, useEffect, useState } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import SubProfileWrapper from './profileNavs/SubProfileWrapper';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { FollowersContext, useFollowers } from '../contexts/FollowersContext';

export default function User() {
    const navigate = useNavigate();
    const { uid } = useParams();
    const { userInfo } = useSelector((state) => state.user)
    const [isFollowing, setIsFollowing] = useState(false);
    const [userDetails, setUserDetails] = useState({
        username: 'guest',
        bio: '',
        profile_picture: '/images/guest.png',

    })
    const token = useSelector((state) => state.user.token);
    const { followers, followings, fetchData } = useFollowers();
    console.log('followers context: ', followers);
    console.log('followings context: ', followings);

    const userId = userInfo?.uid;

    if (userId === uid) {
        navigate('/profile');
    }
    useEffect(() => {
        fetchData();
    }, [uid])
    const fetchUserByUID = async (uid) => {
        try {
            if (!token) {
                throw new Error("No token found!");
            }
            console.log("Passing uid: ", uid)
            const user = await axios.get(`https://dharanas-backend-deployment.onrender.com/user/getUserByUid/${uid}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            )
            const data = user.data.data;
            console.log('fetched user: ', data);
            setUserDetails((prev) => ({
                ...prev,
                username: data.username || prev.username,
                bio: data.bio || prev.bio,
                profile_picture: data.profile_picture || prev.profile_picture,

            }));
        } catch (err) {
            console.error('Error occurred during fetching user: ', err);

        }
    }

    const checkIfFollowing = async () => {
        try {
            const response = await axios.get(`https://dharanas-backend-deployment.onrender.com/user/isFollowing/${uid}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log('Is Following: ', response);
            const isFollowing = response.data.isFollowing;
            setIsFollowing(isFollowing);
        } catch (err) {
            console.error('Error while checking if we following the user or not?', err);
        }
    }
    useEffect(() => {
        fetchUserByUID(uid);
        // console.log("User details: ", userDetails);
        checkIfFollowing();
    }, [uid, token])

    const followUser = async () => {

        try {
            if (isFollowing) return;
            const result = await axios.post(`https://dharanas-backend-deployment.onrender.com/user/follow/${uid}`,
                {
                    uid: uid,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": 'Application/json'
                    },
                });
            const data = result.data;
            console.log('follow user data: ', data);
            setIsFollowing(true);
            await fetchData()

        } catch (err) {
            console.error('Error while following:', err);
        }

    }
    const unFollowUser = async () => {
        try {
            if (!isFollowing) return;
            const result = await axios.delete(`https://dharanas-backend-deployment.onrender.com/user/unfollow/${uid}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            setIsFollowing(false);
            await fetchData();
        } catch (err) {
            if (err.response) {
                console.error('Error while unfollowing: ', err.response.message);
            } else {
                console.error('Error while unfollowing: ', err);
            }
        }
    }
    return (
        <section className='mainContent max-h-screen'>
            <div className='relative flex flex-row md:justify-around justify-between pt-3 pb-8'>
                <div className='mr-8'>
                    <img src={userDetails.profile_picture} alt="pfp" className='w-20 h-20 md:w-32 md:h-32 cursor-pointer object-cover rounded-full aspect-square border-2 border-border' />
                </div>
                <div className='md:px-4 md:w-1/2 flex flex-col flex-1'>

                    <div className='flex flex-row justify-start gap-x-6'>
                        <div className='flex flex-col'>
                            <p className='font-semibold text-lg'>{userDetails.username}</p>
                            <p>{userDetails.bio}</p>

                        </div>
                        {
                            isFollowing ? (

                                <button className='p-1 px-4 h-10 rounded-md buttonWithPrimaryBG' onClick={unFollowUser} >Unfollow</button>
                            ) : (

                                <button className='p-1 px-4 h-10 rounded-md buttonWithPrimaryBG' onClick={followUser} >Follow</button>
                            )
                        }
                    </div>

                    <div className='w-max flex flex-row justify-start pt-2 gap-x-4 followee' onClick={() => { navigate('follows') }}>
                        <p className='followee'><em className='not-italic font-semibold pr-1'>{followers.total}</em> Followers</p>
                        <p className='followee'><em className='not-italic font-semibold pr-1'>{followings.total}</em> Following</p>
                    </div>

                </div>

            </div>
            <SubProfileWrapper />
            <div className='flex justify-center items-start mt-1 pt-4 w-full border-t-2 border-border'>
                <Outlet />
            </div>
        </section>
    )
}
