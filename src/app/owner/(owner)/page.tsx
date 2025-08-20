"use client"

import React from 'react'
import { useGetOwnerBooking } from './hooks/useGetOwnerBooking'
import { ColumnDef } from '@tanstack/react-table'
import { IBooking } from '@/app/(user)/bookings/interface/IBooking'
import { List } from 'lucide-react'
import { parseDate } from '@/lib/parseDate'
import Table from '@/components/Table'

const page = () => {
   const { data } = useGetOwnerBooking()
   const column: ColumnDef<IBooking>[] = [
      {
         id: 'S.N.',
         header: () => <List />,
         cell: ({ row }) => row.index + 1,
         size: 50,
      },
      {
         header: 'Booked By',
         size: 300,
         cell: ({ row }) => (
            <p>{row?.original?.customerName}</p>
         )
      },
      {
         header: 'User',
         size: 300,
         cell: ({ row }) => (
            <p>{row?.original?.user?.username}</p>
         )
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
         header: 'Booking Date',
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