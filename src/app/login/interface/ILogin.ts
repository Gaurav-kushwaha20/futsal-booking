// success response
export interface ILoginSuccess {
 user: IUser;
 token: IToken;
 message: string;
 success: boolean;
}

interface IUser {
 id: string;
 name: string;
 email: string;
 phone_No: string;
 avatar: string | null;
}
interface IToken {
 refresh: string;
 access: string;
}

// Error Response
export interface ILoginError {
 data: {
  message: string;
  success: boolean;
 };
}
