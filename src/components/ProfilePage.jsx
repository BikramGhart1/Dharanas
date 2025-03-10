import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { changepfp } from '../../store/userSlice';

export default function ProfilePage() {
    const pfpRef = useRef();
    const { userInfo } = useSelector((state) => state.user)
    const [pfpfile, setPfpFile] = useState(null);
    // const [previewURL, setPreviewURL] = useState(userInfo?.profile_picture || null)
    const dispatch = useDispatch();
    const userPfp=userInfo?.profile_picture;

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
    }
    return (
        <main className='mainContent'>
            <div>

                <img src={userPfp?userPfp:'https://instagram.fktm20-1.fna.fbcdn.net/v/t51.2885-19/482637126_1399700334734561_1513040046386038325_n.jpg?stp=dst-jpg_s150x150_tt6&_nc_ht=instagram.fktm20-1.fna.fbcdn.net&_nc_cat=105&_nc_oc=Q6cZ2AHGqBWGQ5nxDdXf0Xqnl7w5xRsxZg-EWjEw2AF_eW3zn3Z8Z9ZfVKPSVTnJcqwBrdw&_nc_ohc=cPXiPI900CIQ7kNvgHyTqi-&_nc_gid=cdc126e28ef34f7c8e9d49decf245f31&edm=ALGbJPMBAAAA&ccb=7-5&oh=00_AYHbq9hfar_BRbE7UhEd81CDg8DMgCMjRoqVC2V3DWD_FA&oe=67D4E8CE&_nc_sid=7d3ac5'} alt="pfp" onClick={() => { pfpRef.current.click() }} className='w-32 h-32 cursor-pointer object-cover rounded-full' />

                <p className='font-semibold pl-3 pt-3'>{userInfo?.username || 'Guest'}</p>
            </div>
            <form encType='multipart/form-data' onSubmit={onpfpSubmit}>
                <p>change your profile picture</p>
                <input type="file" ref={pfpRef} accept='image/*' onChange={pfpHandler} name="pfp" id="pfp" className='cursor-pointer' />
                <button type="submit" className='bg-primary px-2 py-1 rounded-md font-semibold'>Submit</button>
            </form>
        </main>
    )
}
