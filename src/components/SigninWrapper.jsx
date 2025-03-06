import React, { useState } from 'react'
import { Link, Outlet, Route, Routes } from 'react-router-dom';

export default function SigninWrapper() {
    const [hasAccount, setHasAccount] = useState(false);
    const toggleHasAccount = () => {
        setHasAccount(!hasAccount);
    }
    return (
        <div className='flex flex-col w-4/5 xl:w-3/5 m-auto md:flex-row bg-contain md:bg-cover bg-no-repeat bg-black bg-opacity-65 md:max-h-min md:p-10 p-6 md:justify-start gap-x-10 text-sm 2xl:text-2xl rounded-3xl'>
            <div className='flex flex-col gap-y-4 md:w-full'>
                <h2 className='font-bold text-2xl'>Sign In</h2>
                <div>
                    <p>Log in to express your Dharanas(Views)</p>
                    <p>Interact with liked minded people and argue with unliked ones</p>
                </div>
                <div className='hidden md:flex flex-col bg-fuchsia-700 bg-opacity-25 pl-4 pr-4'>
                    <p>This section is available for only the PC users</p>
                    <p>Cause we got bigger screen so why not?</p>
                    <p>Nothing much I just wanted to say This background picture is cool</p>
                </div>
                <div  className='text-lg font-semibold pt-4 pb-4'>
                    {
                        hasAccount ? (
                            <div>

                                <p>Already have an account?</p>
                                <Link to='/signin/login' onClick={toggleHasAccount} className='cursor-pointer text-secondary font-bold p-2'>Log in</Link>
                            </div>
                        ) : (
                            <div>
                                <p>Don't have an account?</p>
                                <Link onClick={toggleHasAccount} to='/signin/signup' className='cursor-pointer text-secondary font-bold p-2'>Sign Up</Link>

                            </div>
                        )
                    }
                </div>
            </div>
            <Outlet />
        </div>
    )
}
