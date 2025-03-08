import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux';

export default function ProfilePage() {
    const pfpRef = useRef();
    const [pfpfile, setPfpFile] = useState(null);
    const { userInfo } = useSelector((state) => state.user)
    console.log(userInfo)

    const pfpHandler = (event) => {
        const file = event.target.files[0];
        if (file) {
            setPfpFile(URL.createObjectURL(file));
        }
    }
    return (
        <main className='mainContent'>
            <div>
                {
                    pfpfile ? (
                        <img src={pfpfile} alt="pfp" onClick={() => { pfpRef.current.click() }} className='w-32 h-32 cursor-pointer object-cover rounded-full' />
                    ) : (
                        <p>No Image</p>
                    )
                }
                <p>Username: {userInfo?.username}</p>
            </div>
            <div>
                <p>change your profile picture</p>
                <input type="file" ref={pfpRef} accept='image/*' onChange={pfpHandler} name="pfp" id="pfp" className='cursor-pointer' />

            </div>
        </main>
    )
}
