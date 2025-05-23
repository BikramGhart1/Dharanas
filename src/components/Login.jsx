import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { loginSchema } from '../formvalidations/validateform'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { loginSuccess } from '../../store/userSlice'

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(loginSchema) })
  const navigate = useNavigate();
  const [loginErrors, setErrorLogins] = useState(null);
  const dispatch = useDispatch()

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('https://dharanas-backend-deployment.onrender.com/signup/login', data, {
        headers: { "Content-Type": "application/json" }
      });
      const token = response.data.token;

      //This is to make sure redux is updated
      dispatch(loginSuccess(token));
      console.log(response);

      setTimeout(() => {
        navigate('/');
      }, 1000)
    } catch (err) {
      console.error("Error: ", err.response?.data || err.message);
      setErrorLogins(err.response?.data);
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
        <input autoComplete='off' type="password" {...register("password")} name="password" id="password" className='border border-border outline-none' />
        {errors.password && <p className='bg-red-500 mt-1 rounded-md w-max p-1'>{errors.password.message}</p>}
        {loginErrors && <p className='bg-red-500 mt-1 p-1'>{loginErrors.message}</p>}
      </div>
      <div className='mt-3'>
        <input type="submit" value="Login" className='bg-primary text-text p-2 rounded-lg cursor-pointer' />
      </div>
    </form>

  )
}
