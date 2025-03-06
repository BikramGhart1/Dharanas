import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { signUpSchema } from '../formvalidations/validateform'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Signup() {
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(signUpSchema) });
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        // console.log("Form data: ", data);
        try {
            const response = await axios.post('http://localhost:3000/signup/signin', data, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            console.log("server response: ", response.data);
            setTimeout(() => {
                //    reset();
                navigate('/');
            }, 1000)
        } catch (err) {
            console.error("Error: ", err.response?.data || err.message);
        }

    }
    return (

        <form action="" className='flex flex-col md:w-full gap-y-3' onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col '>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" {...register("username")} id="username" className='border border-border outline-none' />
                {errors.username && <p className='bg-red-400 p-1'>{errors.username.message}</p>}
            </div>
            <div className='flex flex-col'>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" {...register("email")} id="email" className='border border-border outline-none' />
                {errors.email && <p className='bg-red-400 p-1'>{errors.email.message}</p>}


            </div>
            <div className='flex flex-col'>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" {...register("password")} id="password" className='border border-border outline-none' />
                {errors.password && <p className='bg-red-400 p-1'>{errors.password.message}</p>}

            </div>

            <div className='flex flex-col'>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input type="password" name="confirmPassword" {...register("confirmPassword")} id="confirmPassword" className='border border-border outline-none' />
                {errors.confirmPassword && <p className='bg-red-400 p-1'>{errors.confirmPassword.message}</p>}

            </div>

            <div className='mt-3'>
                <input type="submit" value="Sign Up" className='bg-primary text-text p-2 rounded-lg cursor-pointer' />
            </div>
        </form>

    )
}
