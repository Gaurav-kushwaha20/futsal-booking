import { IApiPaginationResponse } from '@/interface/IResponse';

export interface User {
 id: string;
 username: string;
 citizenshipNumber: string;
 phone_no: string | null;
 fullName: string | null;
 email: string | null;
 dateOfBirth: string | null;
 profileImageUrl: string | null;
 owner: boolean;
 user: boolean;
 admin: boolean;
}

export interface Futsal {
 id: number;
 name: string;
 city: string;
 district: string;
 registrationNumber: string;
 registrationPhoto: string;
 coverImage: string;
 latitude: number;
 longitude: number;
 images: string[];
}

export interface IBooking {
 id: number;
 customerName: string;
 phone: string;
 bookedDate: string | null;
 status: 'PENDING' | 'APPROVED' | 'REJECTED' | string; // extend if more statuses exist
 createAt: string;
 user: User;
 futsal: Futsal;
 owner: User;
 price: number;
 paid: boolean;
}

export type BookingListResponse = IApiPaginationResponse<IBooking>;
