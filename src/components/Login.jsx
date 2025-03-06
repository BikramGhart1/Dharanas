import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { loginSchema } from '../formvalidations/validateform'
import axios from 'axios'

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(loginSchema) })
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:3000/signup/login', data, {
        headers: { "Content-Type": "application/json" }
      });
      localStorage.setItem('token', response.data.token);
      console.log("Server response: ", response.data);
      setTimeout(() => {
        navigate('/');
      }, 1000)
    } catch (err) {
      console.error("Error: ", err.response?.data || err.message);
    }
  }
  return (

    <form action="" onSubmit={handleSubmit(onSubmit)} className='flex flex-col w-full md:w-full gap-y-3'>
      <div className='flex flex-col'>
        <label htmlFor="email">Email</label>
        <input type="email" {...register("email")} name="email" id="email" className='border border-border outline-none' />
        {errors.email && <p className='bg-red-500 mt-1 p-1'>{errors.email.message}</p>}
      </div>
      <div className='flex flex-col'>
        <label htmlFor="password">Password</label>
        <input type="password" {...register("password")} name="password" id="password" className='border border-border outline-none' />
        {errors.password && <p className='bg-red-500 mt-1 rounded-md w-max p-1'>{errors.password.message}</p>}
      </div>
      <div className='mt-3'>
        <input type="submit" value="Sign Up" className='bg-primary text-text p-2 rounded-lg cursor-pointer' />
      </div>
    </form>

  )
}
