export interface IGetFutsalDetails {
 message: string;
 code: number;
 success: boolean;
 data: IFutsalData;
 errors: null;
}

export interface IFutsalData {
 id: string;
 name: string;
 registrationNumber: string;
 latitude: number;
 longitude: number;
 district: string;
 city: string;
 images: string[];
 coverImage: string;
 registrationPhoto: string;
 owner: IOwner;
 createdAt: string; // ISO date string
 updatedAt: string; // ISO date string
}

export interface IOwner {
 id: string;
 username: string;
 citizenshipNumber: string;
 phone_no: string;
 fullName: string | null;
 email: string | null;
 address: string | null;
 dateOfBirth: string | null; // or `Date | null` depending on how you parse
 emergencyContact: string | null;
 profileImageUrl: string | null;
 is_user: boolean;
 is_owner: boolean;
}
