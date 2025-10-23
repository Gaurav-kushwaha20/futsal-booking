import { cookies } from 'next/headers';

interface IGetCookie {
	cookieName: string;
	defaultValue?: string | null;
}
export const getCookie = async ({ cookieName }: IGetCookie) => {
	const cookieStore = await cookies();
	const cookieValue = cookieStore.get(cookieName)?.value || 'ar';
	return cookieValue;
};

interface ISetCookie {
	cookieName: string;
	cookieValue: string;
	options?: {
		maxAge?: number; // in seconds
		expires?: Date;
		path?: string;
		domain?: string;
		secure?: boolean;
		httpOnly?: boolean;
		sameSite?: 'strict' | 'lax' | 'none';
	};
}

export const setCookie = async ({ cookieName, cookieValue, options = {} }: ISetCookie) => {
	const cookieStore = await cookies();

	// Set default options
	const defaultOptions = {
		path: '/',
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'lax' as const,
		...options,
	};

	cookieStore.set(cookieName, cookieValue, defaultOptions);
};
