export interface Location {
 x: number;
 y: number;
 type: string;
 coordinates: number[];
}

export interface Owner {
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
}

export interface IFutsal {
 id: string;
 name: string;
 registrationNumber: string;
 address: string;
 location: Location;
 state: string;
 district: string;
 city: string;
 images: string[];
 coverImage: string;
 registrationPhoto: string;
 owner: Owner;
 createdAt: string;
 updatedAt: string;
}

export interface FutsalData {
 data: IFutsal[];
 page: number;
 pageSize: number;
 totalItems: number;
 totalPages: number;
}

export interface IGetFutsals {
 message: string;
 code: number;
 success: boolean;
 data: FutsalData;
 errors: null;
} 

// Here interface defines the shape/structure of an Object.While fetching the data from the API , it should contain all these required data.
