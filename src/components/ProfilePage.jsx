import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { changepfp, updateProfile } from '../../store/userSlice';
import { Link, Outlet } from 'react-router-dom';
import SubProfileWrapper from './profileNavs/SubProfileWrapper';
import { profileUpdateSchema } from '../formvalidations/validateform';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Followee from './Followee';



const ProfilePage = () => {
    const pfpRef = useRef();
    const { userInfo } = useSelector((state) => state.user)
    const [pfpfile, setPfpFile] = useState(null);
    const dispatch = useDispatch();
    const [editMode, setEditMode] = useState(false);
    const [openFollowee,setOpenFollowee]=useState(false);

    const { register, handleSubmit, formState: { errors }, watch, reset } = useForm({
        resolver: zodResolver(profileUpdateSchema),
        defaultValues: {
            username: '',
            bio: ''
        }
    })

    useEffect(() => {
        if (userInfo) {
            reset({
                username: userInfo.username,
                bio: userInfo.bio
            });
        }
    }, [userInfo, reset]);
    const userPfp = useMemo(() => userInfo?.profile_picture, [userInfo?.profile_picture]);

    const bioValue = watch('bio')
    const bioLength = bioValue?.length || 0;

    const onSubmit = useCallback(async (data) => {
        try {
            dispatch(updateProfile(data));
            setEditMode(false)
        } catch (err) {
            console.error("error updating the profile: ", err);
        }

    }, [dispatch])

    const pfpHandler = useCallback((event) => {
        console.log('pfpfHandler fun called');
        const file = event.target.files[0];
        if (file) {
            setPfpFile(file);
        }
    }, [])

    const onpfpSubmit = useCallback((event) => {
        event.preventDefault();
        console.log('onpfpsubmit fun called');
        if (!pfpfile) {
            console.log('No file selected');
            return;
        }

        const formData = new FormData()
        formData.append('pfp', pfpfile);
        formData.append('uid', userInfo?.uid);

        dispatch(changepfp(formData));
        setEditMode(!editMode)
    }, [pfpfile, userInfo, dispatch])
    
    const toggleOpenFollowee=()=>{
        setOpenFollowee((prev)=>!prev);
    }

    return (
        <main className='mainContent relative'>
            <div className='flex flex-row md:justify-around justify-between pt-3 '>
                <div className='mr-8'>
                    <img src={userPfp ? userPfp : '/images/guest.png'} alt="pfp" onClick={() => { pfpRef.current.click() }} className='w-20 h-20 md:w-32 md:h-32 cursor-pointer object-cover rounded-full aspect-square border-2 border-border' />
                </div>
                <div className='md:px-4 md:w-1/2 flex flex-col flex-1'>
                    {
                        editMode ? (
                            <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
                                <div className='flex flex-row justify-between'>
                                    <input type='text' {...register("username")} name='username' autoFocus className='border-b border-solid border-border bg-transparent rounded-lg mb-2 text-text-secondary opacity-70 focus:ring-2 focus:ring-primary ' />
                                    {errors.username && <p className='bg-red-400 px-3 py-1'>{errors.username.message}</p>}
                                    <button type="submit" className='bg-primary px-4 rounded-lg font-semibold'>Save</button>
                                </div>
                                <div className='w-full'>
                                    <label htmlFor="bio">Edit Bio</label>
                                    <textarea name="bio" id="bio" {...register("bio")} className='w-full mt-2 border border-solid border-border bg-transparent px-2 min-h-24 rounded-lg outline-none p-3 focus:ring-2 focus:ring-primary resize-none'></textarea>
                                    {errors.bio && <p className='bg-red-400 px-3 py-1'>{errors.bio.message}</p>}
                                    <p className={`text-right text-sm opacity-45 font-semibold ${bioLength > 500 ? `text-red-400` : `text-text-secondary`}`}>{bioLength}/500</p>
                                </div>

                            </form>
                        ) : (
                            <div>
                                <div className='flex flex-row justify-start gap-x-6'>

                                    <p className='font-semibold text-lg'>{userInfo?.username || 'Guest'}</p>
                                    <button className='bg-primary p-1 px-4 rounded-md' onClick={() => { setEditMode(!editMode) }}>Edit</button>
                                </div>
                                <div>
                                    <p>{userInfo?.bio || 'not available'}</p>

                                </div>
                            </div>
                        )
                    }
                    <div className='flex flex-row justify-start pt-2 gap-x-4 followee' onClick={toggleOpenFollowee}>
                        <p className='followee'><em className='not-italic font-semibold pr-1'>109</em> Followers</p>
                        <p className='followee'><em className='not-italic font-semibold pr-1'>145</em> Following</p>
                    </div>
                </div>
            </div>
            {/* <Followers /> */}{
                openFollowee && <Followee toggleOpenFollowee={toggleOpenFollowee}/>
            }
            <div className='flex flex-col items-center pt-5'>

                {
                    editMode
                    &&
                    <form encType='multipart/form-data' onSubmit={onpfpSubmit} className='pb-10'>

                        <p className='text-sm'>Change your profile picture</p>
                        <input type="file" ref={pfpRef} accept='image/*' onChange={pfpHandler} name="pfp" id="pfp" className='cursor-pointer text-text' />
                        <button type="submit" className='bg-primary px-2 py-1 rounded-md font-semibold'>Submit Picture</button>
                    </form>
                }
            </div>
            <SubProfileWrapper />
            <div className='flex justify-center items-start mt-4 pt-4 w-full border-t-2 border-border'>

                <Outlet />
            </div>

        </main >
    )
}

export default React.memo(ProfilePage);