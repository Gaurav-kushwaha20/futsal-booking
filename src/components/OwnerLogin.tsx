import React from 'react';
import Link from 'next/link';
import { FormikProvider } from 'formik';
import InputText from '@/components/form/InputText';
import InlineLoader from '@/components/InlineLoader';
import { useOwnerLogin } from '@/hooks/useOwnerLogin';
import Button from './form/Button';

const OwnerLogin: React.FC = () => {
    const { formik, isLoading } = useOwnerLogin();
    return (
        <div className="flex items-center justify-center bg-gradient-to-b py-8 from-blue-500 via-purple-500 to-pink-500 rounded-lg">
            <div className="w-full max-w-xl bg-white rounded-lg px-6 py-10 shadow-md">
                <div className="text-center mb-8">
                    <p className="text-xl font-semibold">Owner Login</p>
                    <p className="text-gray-600 mt-2">Enter your credentials to access your account</p>
                </div>

                <FormikProvider value={formik}>
                    <form onSubmit={formik.handleSubmit} className="space-y-6">
                        <div className="flex flex-col gap-4 w-3/4 mx-auto">
                            <InputText label="Username" name="username" placeholder="Enter Username" />
                            <InputText label="Password" name="password" type="password" placeholder="Enter password" />

                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center gap-2 transition"
                            >
                                <span>Sign In As Owner</span>
                                {isLoading && <InlineLoader className="text-white" />}
                            </Button>


                        </div>
                    </form>
                </FormikProvider>

                <div className="mt-6 text-center text-sm">
                    <p className="text-black">Forgot your password?</p>
                    <Link href={'#'} className="text-blue-600 hover:underline">
                        Reset Password
                    </Link>
                </div>
            </div>
        </div>
    );
};
export default OwnerLogin;
