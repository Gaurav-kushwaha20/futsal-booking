import { endpoints } from '@/constant/endpoints.constant';
import { getData } from './axios';
import { IApiDetailsResponse } from '@/interface/IResponse';

// Does Logged In User Exist
interface IDoesUserExist {
	email: string;
}
interface IUserDetails {
	firstName: string;
	lastName: string;
	email: string;
	provider: string;
}
export type IUserExist = IApiDetailsResponse<IUserDetails | null>;
export const doesUserExist = async ({ email }: IDoesUserExist) => {
	const res: IUserExist = await getData(endpoints.auth.doesUserExist, { email });
	return res;
};
// Register the user
interface IRegisterUserParams {
	email: string;
	firstName: string;
	lastName: string;
	profile: string;
	provider: string;
}

type IRegisterUserResponse = IApiDetailsResponse<{
	email: string;
	firstName: string;
	lastName: string;
}>;
export const registerUser = async ({ email, firstName, lastName, profile, provider }: IRegisterUserParams) => {
	const res: IRegisterUserResponse = await getData(endpoints.auth.createUser, undefined, { method: 'POST', body: { email, firstName, lastName, profile, provider } });
	return res;
};
