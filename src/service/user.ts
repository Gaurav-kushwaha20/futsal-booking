import { endpoints } from '@/constant/endpoints.constant';
import { getData } from './axios';
import { IApiDetailsResponse } from '@/interface/IResponse';

interface IDoesUserExist {
	email: string;
}
interface IUserDetails {
	first_name: string;
	last_name: string;
	email: string;
	provider: string;
}
export type IUserExist = IApiDetailsResponse<IUserDetails | null>;
export const doesUserExist = async ({ email }: IDoesUserExist) => {
	const res: IUserExist = await getData(endpoints.auth.doesUserExist, { email });
	return res;
};

interface IRegisterUser {
	email: string;
	firstName: string;
	lastName: string;
	
}

export const registerUser = async ({ email }: IDoesUserExist) => {
	const res: IUserExist = await getData(endpoints.auth.createUser, { email });
	return res;
};
