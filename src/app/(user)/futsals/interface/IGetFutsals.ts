export interface IGetFutsalSuccess {
 message: string;
 code: number;
 success: boolean;
 data: {
  data: IFutsal[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
 };
 errors: null;
}

export interface IFutsal {
 id: string;
 name: string;
 registrationNumber: string;
 address: string;
 location: {
  x: number;
  y: number;
  coordinates: [number, number];
  type: string;
 };
 state: string;
 district: string;
 city: string;
 images: string[];
 converImage: string;
 registrationPhoto: string;
 owner: {
  id: string;
  username: string;
  password: string;
  citizenshipNumber: string;
  phone_no: string;
  fullName: string | null;
  email: string | null;
  address: string | null;
  dateOfBirth: string | null;
  emergencyContact: string | null;
  profileImageUrl: string | null;
  is_user: boolean;
  is_owner: boolean;
 };
 createdAt: string;
 updatedAt: string;
}
