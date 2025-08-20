"use client"
import React from 'react'
import { useGetUserBooking } from './hooks/useGetUserBooking'
import { IBooking } from './interface/IBooking'
import { ColumnDef } from '@tanstack/react-table'
import { List } from 'lucide-react'
import Table from '@/components/Table'
import { parseDate } from '@/lib/parseDate'

const page = () => {
    const { data } = useGetUserBooking()
    const column: ColumnDef<IBooking>[] = [
        {
            id: 'S.N.',
            header: () => <List />,
            cell: ({ row }) => row.index + 1,
            size: 50,
        },
        {
            header: 'Futsal Name',
            size: 300,
            cell: ({ row }) => (
                <p>{row?.original?.futsal?.name}</p>
            )
        },
        {
            header: 'Futsal City',
            size: 300,
            cell: ({ row }) => (
                <p>{row?.original?.futsal?.city}</p>
            )
        },
        {
            header: 'Owner',
            size: 300,
            cell: ({ row }) => (
                <p>{row?.original?.owner?.username}</p>
            )
        },
        {
            header: 'Bookking Date',
            size: 300,
            cell: ({ row }) => (
                <p>{parseDate(row?.original?.createAt)}</p>
            )
        },
        {
            header: 'Booked Date',
            size: 300,
            cell: ({ row }) => (
                <p>{row?.original?.bookedDate}</p>
            )
        },
        {
            header: 'Price',
            size: 300,
            cell: ({ row }) => (
                <p>{row?.original?.price.toString()}</p>
            )
        },
        {
            header: 'Status',
            size: 300,
            cell: ({ row }) => (
                <p>{row?.original?.status}</p>
            )
        },
        {
            header: 'Email',
            size: 300,
            cell: ({ row }) => (
                <p>{row?.original?.owner?.email}</p>
            )
        },
        {
            header: 'Phone',
            size: 300,
            cell: ({ row }) => (
                <p>{row?.original?.owner?.phone_no}</p>
            )
        },
    ]
    return (
        <div>
            <Table totalPage={data?.data?.pageSize} totalItem={data?.data?.totalItems} columns={column} data={data?.data?.data || []} />
        </div>
    )
}

export default page