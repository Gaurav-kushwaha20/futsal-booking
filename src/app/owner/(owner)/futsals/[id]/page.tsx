"use client"
import React, { use } from 'react';
import FutsalDetails from './partials/FutsalDetails';
import TimeSlot from './partials/TimeSlot';

interface IProps {
    params: Promise<{ id: string }>
}

const Page = ({ params }: IProps) => {
    const { id } = use(params)
    return (
        <div className='space-y-10'>
            <FutsalDetails id={id} />
            <TimeSlot futsalId={id} />
        </div>


    );
}

export default Page;
