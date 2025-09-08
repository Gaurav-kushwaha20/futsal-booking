export interface IUserLogin {
 username: string;
 password: string;
}

export interface User {
 id: string;
 username: string;
 password: string;
 email: string | null;
 profile_picture: string | null;
 address: string | null;
 is_user: boolean;
 is_owner: boolean;
 phone_no: string | null;
 verified: boolean;
}

export interface Token {
 access: string;
 refresh: string;
}

export interface LoginData {
 user: User;
 token: Token;
}

export interface IUserLoginSuccess {
 message: string;
 code: number;
 success: boolean;
 data: LoginData;
 errors: null;
}

export interface IUserLoginError {
 data: {
  message: string;
  code: number;
  success: false;
  data: null;
  errors: null;
 };
}
