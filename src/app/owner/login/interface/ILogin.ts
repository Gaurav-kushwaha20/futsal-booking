export interface ILoginOwner {
 message: string;
 code: number;
 success: boolean;
 data: {
  user: {
   id: string;
   username: string;
   password: string;
   citizenshipNumber: string | null;
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
  token: {
   access: string;
   refresh: string;
  };
 };
 errors: null;
}

// error
export interface ValidationErrors {
 password?: string[];
 username?: string[];
 [key: string]: string[] | undefined; // for future dynamic fields
}

export interface ILoginOwnerError {
 data: {
  message: string;
  code: number;
  success: boolean;
  data: Record<string, never>; // empty object
  errors: ValidationErrors;
 };
}
