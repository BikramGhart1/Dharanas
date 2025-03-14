import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { changepfp } from '../../store/userSlice';
import { Link, Outlet } from 'react-router-dom';
import SubProfileWrapper from './profileNavs/SubProfileWrapper';

export default function ProfilePage() {
    const pfpRef = useRef();
    const { userInfo } = useSelector((state) => state.user)
    const [pfpfile, setPfpFile] = useState(null);
    // const [previewURL, setPreviewURL] = useState(userInfo?.profile_picture || null)
    const dispatch = useDispatch();
    const [editMode, setEditMode] = useState(false);
    const [tempUserInfo, setTempUserInfo] = useState({
        username: "",
        bio: ""
    })

    const [justClicked, setJustClicked] = useState('posts');
    useEffect(() => {
        setTempUserInfo({
            username: userInfo?.username,
            bio: userInfo?.bio
        })
    }, [userInfo]);
    const userPfp = userInfo?.profile_picture;
    console.log(userPfp);

    const justClickedHandler = (e) => {
        setJustClicked(e.target);
    }
    const userInfoEditHandle = (e) => {

    }
    const inputOnchangeHandler = (e) => {
        console.log(tempUserInfo);
        setTempUserInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }
    const pfpHandler = (event) => {
        const file = event.target.files[0];
        if (file) {

            setPfpFile(file);
            // setPreviewURL(URL.createObjectURL(file));
        }
    }
    const onpfpSubmit = (event) => {
        event.preventDefault();
        if (!pfpfile) {
            console.log('No file selected');
            return;
        }

        const formData = new FormData()
        formData.append('pfp', pfpfile);
        formData.append('uid', userInfo?.uid);

        dispatch(changepfp(formData));
        setEditMode(!editMode)
    }
    return (
        <main className='mainContent'>
            <div className='flex flex-row md:justify-around justify-between pt-3 '>
                <div className='mr-8'>
                    <img src={userPfp ? userPfp : 'https://avatars.githubusercontent.com/u/132071114?v=4'} alt="pfp" onClick={() => { pfpRef.current.click() }} className='w-20 h-20 md:w-32 md:h-32 cursor-pointer object-cover rounded-full aspect-square border-2 border-border' />
                    {/* <img src="http://localhost:3000/demo/johnpork.jpeg" alt="img" /> */}
                    {/* <img src="http://localhost:3000/demo/subdir/jokerlaugh.png" alt="img" /> */}
                </div>
                <div className='md:px-4 md:w-1/2  flex flex-col flex-1'>
                    {
                        editMode ? (
                            <form className='w-full'>
                                <div className='flex flex-row justify-between'>
                                    <input type='text' name='username' value={tempUserInfo.username} autoFocus onChange={inputOnchangeHandler} className='border-b border-solid border-border bg-transparent rounded-lg mb-2 text-text-secondary opacity-70 focus:ring-2 focus:ring-primary ' />
                                    <button type="submit" onClick={() => { setEditMode(!editMode) }} className='bg-primary px-4 rounded-lg font-semibold'>Save</button>
                                </div>
                                <div className='w-full'>
                                    <label htmlFor="bio">Edit Bio</label>
                                    <textarea name="bio" id="bio" value={tempUserInfo.bio} onChange={inputOnchangeHandler} className='w-full mt-2 border border-solid border-border bg-transparent px-2 min-h-24 rounded-lg outline-none p-3 focus:ring-2 focus:ring-primary resize-none'></textarea>
                                    <p className='text-right text-sm opacity-45 font-semibold'>0/500</p>
                                </div>

                            </form>
                        ) : (
                            <div>
                                <div className='flex flex-row justify-start gap-x-6'>

                                    <p className='font-semibold text-lg'>{userInfo?.username || 'Guest'}</p>
                                    <button className='bg-primary p-1 px-4 rounded-md' onClick={() => { setEditMode(!editMode) }}>Edit</button>
                                </div>
                                <div>
                                    <p>This is user's bio</p>

                                </div>
                            </div>
                        )
                    }
                    <div className='flex flex-row justify-start gap-x-4'>
                        <p>3 Followers</p>
                        <p>4 Following</p>
                    </div>
                </div>
            </div>
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
            <SubProfileWrapper/>
            <div className='flex justify-center items-start mt-4 pt-4 w-full border-t-2 border-border'>

                <Outlet />
            </div>

        </main >
    )
}
