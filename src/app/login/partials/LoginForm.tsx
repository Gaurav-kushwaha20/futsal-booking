import React from 'react'
import useLogin from '../hooks/useLogin'
import InlineLoader from '@/components/InlineLoader'
import { CgPassword } from 'react-icons/cg'
import { MdEmail } from 'react-icons/md'


const LoginForm: React.FC = () => {
    const { formik, isLoading } = useLogin()
    return (
        <div className='h-full w-full  '>
            <form onSubmit={formik.handleSubmit}>
                <div className='flex flex-col items-center justify-center gap-3 lg:gap-6'>
                    {/* Email */}
                    <div className='w-3/4 mx-auto relative mb-8'> {/* Add margin-bottom to accommodate error message */}
                        <input
                            autoComplete='username'
                            type="text"
                            id='email'
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`paragraph-p1-regular text-Black/black-200 w-full h-14 rounded-lg border px-12 py-4 ${formik.touched.email && formik.errors.email
                                ? "border-error" // Error state
                                : formik.touched.email && !formik.errors.email
                                    ? "border-Black-100" // Valid state
                                    : "border-Black-200" // Default border
                                }`}
                            placeholder='Enter your email'
                        />
                        <div className='absolute inset-0 left-0 flex items-center pl-4 pointer-events-none'>
                            <MdEmail className='w-4 h-4' />
                        </div>
                        {formik.touched.email && formik.errors.email && (
                            <p className='paragraph-p2-regular text-red-500 absolute -bottom-6 left-0'>
                                {formik.errors.email}
                            </p>
                        )}
                    </div>

                    {/* Password */}
                    <div className='w-3/4 mx-auto relative mb-8'> {/* Add margin-bottom to accommodate error message */}
                        <input
                            autoComplete='current-password'
                            type="password"
                            id='password'
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`paragraph-p1-regular text-Black/black-200 border w-full h-14 rounded-lg px-12 py-4 ${formik.touched.password && formik.errors.password
                                ? "border-error" // Error state
                                : formik.touched.password && !formik.errors.password
                                    ? "border-Black-100" //  Valid state
                                    : "border-Black-200" // Default border
                                }`}
                            placeholder='Enter your password'
                        />
                        <div className='absolute inset-0 left-0 flex items-center pl-4 pointer-events-none'>
                            <CgPassword className='w-4 h-4' />
                        </div>
                        {formik.touched.password && formik.errors.password && (
                            <p className='paragraph-p2-regular text-red-500 absolute -bottom-6 left-0'>
                                {formik.errors.password}
                            </p>
                        )}
                    </div>

                    {/* Submit button */}
                    <div className='w-3/4 mx-auto mt-5'>
                        <button
                            type='submit'
                            className=' w-full h-11 mx-auto bg-primary rounded-lg flex items-center justify-center gap-2'
                            disabled={isLoading}
                        >
                            <span className='typography-p2-medium text-white'>Sign In</span>
                            <span>{isLoading ? <InlineLoader className='text-white' /> : ""}</span>
                        </button>
                    </div>
                </div>
            </form >
        </div >
    )
}

export default LoginForm