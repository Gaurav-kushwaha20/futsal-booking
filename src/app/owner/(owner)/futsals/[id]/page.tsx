"use client"
import React, { use } from 'react';
import useGetFutsalDetails from './hooks/useGetFutsalDetails';
import Image from 'next/image';
import LoadingScreen from '@/components/LoadingScreen';

interface IProps {
    params: Promise<{ id: string }>
}

const Page = ({ params }: IProps) => {
    const { id } = use(params)
    const { data, isLoading, isError } = useGetFutsalDetails({ id })
    if (isLoading) return <LoadingScreen />
    if (isError) return 
    console.log("Futsals data", data)
    return (
        <div className="border rounded-lg max-w-4xl mx-auto p-4 space-y-6">

            {/* CoverImage  */}
            <div className='relative w-full h-64 rounded-lg overflow-hidden shadow-md'>
                <Image className='object-cover'
                    src={data?.data?.coverImage}
                    fill
                    alt={data?.data?.coverImage}
                />
                <div className="absolute bottom-0 left-4 bg-black bg-opacity-50 text-white p-2 rounded">
                    <h1 className="text-2xl font-bold">{data?.data?.name}</h1>
                    <p>Reg. No: {data?.data?.registrationNumber}</p>
                    <p>{data?.data?.city}, {data?.data?.district}</p>
                </div>
            </div>

            {/* Details */}
            <div className="bg-white shadow p-4 rounded-lg">
                <h2 className="text-lg font-semibold mb-2">Details</h2>
                <table className="w-full border-collapse">
                    <tbody>
                        <tr>
                            <td className="border p-2 font-medium">Name</td>
                            <td className="border p-2">{data?.data?.name}</td>
                        </tr>
                        <tr>
                            <td className="border p-2 font-medium">Registration No</td>
                            <td className="border p-2">{data?.data?.registrationNumber}</td>
                        </tr>
                        <tr>
                            <td className="border p-2 font-medium">City</td>
                            <td className="border p-2">{data?.data?.city}</td>
                        </tr>
                        <tr>
                            <td className="border p-2 font-medium">District</td>
                            <td className="border p-2">{data?.data?.district}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Registration Image */}
            <div className="bg-white shadow p-4 rounded-lg">
                <h2 className="text-lg font-semibold mb-2">Registration Photo</h2>
                <div className="relative w-64 h-64">
                    <Image src={data?.data?.registrationPhoto}
                        alt={data?.data?.registrationPhoto}
                        fill
                        className='object-cover rounded-lg'
                    />
                </div>
            </div>

            {/* Image Gallery */}
            <div className="bg-white shadow p-4 rounded-lg">
                <h2 className="text-lg font-semibold mb-2">Gallery</h2>
                <div className="grid grid-cols-2 gap-4">
                    {data?.data?.images.map((imgUrl: string, index: number) => (
                        <div key={index} className="relative w-full h-48 rounded-lg overflow-hidden">
                            <Image src={imgUrl}
                                alt={imgUrl}
                                fill
                                className='object-cover'
                            />
                        </div>
                    ))}
                </div>
            </div>

        </div>


    );
}

export default Page;
