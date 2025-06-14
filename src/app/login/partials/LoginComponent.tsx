import React from 'react'
import Link from 'next/link'
import { PATH } from '@/constant/PATH.constant'
import LoginForm from './LoginForm'
const LoginComponent: React.FC = () => {
    return (
        <div
            className={`h-screen w-screen flex items-center justify-center bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500`}>
            <div className='h-1/2 w-fit lg:w-1/2'>
                <div className='h-full w-full bg-[#ffffff] pt-1 px-10 mb-1 lg:pb-10 rounded-lg'>
                    <div className='mt-10 lg:mt-20 ml'>
                        <p className='text-center typography-h3'>Welcome Back</p>
                        <p className='typography-p2-regular text-Black-200 text-center mt-2'>Enter your Credentials to access your account</p>
                    </div>
                    {/* Login form */}
                    <div className='w-full h-fit pt-10'>
                        <LoginForm />
                    </div>
                </div>
                {/* Password reset section */}
                <div className='mt-5 lg:mt-10 flex flex-col gap-1 items-center justify-center lg:flex-row'>
                    <p className='text-center paragraph-p1-regular text-black'>Forgot your password?</p>
                    <Link href={PATH.reset}>
                        <p className='text-center paragraph-p1-semibold text-primary cursor-pointer'>Reset Password</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default LoginComponent