/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from 'next/headers';

export const getData = async <T = any>(
	url: string,
	params?: Record<string, any>,
	options?: {
		timeout?: number;
		method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
		headers?: Record<string, string>;
		body: any;
	}
): Promise<T> => {
	const timeout = options?.timeout ?? 30000;
	const cookieStore = await cookies();
	const lang = cookieStore.get('MYNEXTAPP_LOCALEMANISH')?.value || 'en';

	const queryParams = new URLSearchParams({
		lang,
		...Object.fromEntries(Object.entries(params ?? {}).filter(([_, v]) => v != null)),
	});

	const fetchUrl = `${process.env.NEXT_PUBLIC_BASE_API}${url}?${queryParams.toString()}`;
	const controller = new AbortController();
	const timeoutId = setTimeout(() => controller.abort(), timeout);

	try {
		const response = await fetch(fetchUrl, {
			method: options?.method ?? 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
				Pragma: 'no-cache',
				Expires: '0',
				...options?.headers,
			},
			body: options?.body ? JSON.stringify(options?.body) : undefined,
			signal: controller.signal,
			credentials: 'include',
		});

		clearTimeout(timeoutId);

		if (!response.ok) {
			throw new Error(`Request failed with status ${response.status}: ${response.statusText}`);
		}

		try {
			const data: T = await response.json();
			return data;
		} catch {
			throw new Error(`Invalid JSON response from ${fetchUrl}`);
		}
	} catch (error: any) {
		if (error.name === 'AbortError') {
			console.error(`Request to ${fetchUrl} timed out after ${timeout}ms`);
		} else {
			console.error(`Request failed to ${fetchUrl}:`, error);
		}
		throw error;
	}
};
