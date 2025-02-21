import React from 'react'

export default function Login() {
  return (
  
    <form action="" className='flex flex-col w-full md:w-full gap-y-3'>
        <div className='flex flex-col'>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" className='border border-border outline-none' />
        </div>
        <div className='flex flex-col'>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" className='border border-border outline-none' />
        </div>
        <div className='mt-3'>
            <input type="submit" value="Sign Up" className='bg-primary text-text p-2 rounded-lg'/>
        </div>
    </form>

  )
}
