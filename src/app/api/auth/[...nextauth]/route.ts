import { COOKIE_CONFIG } from '@/constant/cookie.constant';
import { getCookie } from '@/lib/cookie';
import { doesUserExist, registerOwner, registerUser } from '@/service/user';
import NextAuth, { NextAuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import GoogleProvider from 'next-auth/providers/google';
import { ProviderType } from 'next-auth/providers/index';

// Extend the built-in JWT interface
interface CustomJWT extends JWT {
	id?: string;
	email_verified?: boolean;
	given_name?: string;
	family_name?: string;
}

// Extend the built-in Session interface
declare module 'next-auth' {
	interface Account {
		provider: string; // 'google', 'github', etc.
		type: ProviderType; // 'oauth', 'credentials', etc.
		providerAccountId: string; // User ID from the provider
		access_token: string; // OAuth access token
		expires_at: number; // Token expiration timestamp
		scope: string; // Permissions scope
		token_type: string; // Usually 'Bearer'
		id_token: string; // JWT ID token
	}
	interface Session {
		user: {
			id: string;
			email: string;
			name: string;
			image?: string;
			email_verified?: boolean;
			given_name?: string;
			family_name?: string;
		};
	}

	interface User {
		id: string;
		name: string;
		email: string;
		image?: string;
	}

	interface Token {
		name?: string | null; // User's full name
		email?: string | null; // User's email
		picture?: string | null; // Profile picture URL
		sub?: string; // Subject (user ID)
	}

	interface Profile {
		iss: string; // Issuer - 'https://accounts.google.com'
		azp: string; // Authorized party - client ID
		aud: string; // Audience - client ID
		sub?: string; // Subject - unique user ID
		email?: string; // User's email address
		email_verified: boolean; // Whether email is verified
		at_hash: string; // Access token hash
		name?: string; // Full name
		picture: string; // Profile picture URL
		given_name: string; // First name
		family_name: string; // Last name
		iat: number; // Issued at timestamp
		exp: number; // Expiration timestamp
	}
}

export const authOptions: NextAuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
			httpOptions: {
				timeout: 10000,
			},
		}),
	],
	session: { strategy: 'jwt' },
	secret: process.env.NEXTAUTH_SECRET,
	callbacks: {
		async jwt({ token, profile, account }): Promise<CustomJWT> {
			const role = await getCookie({ cookieName: COOKIE_CONFIG.signInRole });

			if (profile) {
				if (role === COOKIE_CONFIG.ownerRole) {
					try {
						const response = await doesUserExist({ email: profile?.email! });
						if (response?.data === null) {
							const response = await registerOwner({
								email: profile?.email!,
								firstName: profile?.given_name!,
								lastName: profile?.family_name!,
								profile: profile?.picture,
								provider: account?.provider!,
							});
						}
					} catch (error) {
						console.error('Error in JWT callback:', error);
						return token;
					}
				} else if (role === COOKIE_CONFIG.userRole) {
					try {
						const response = await doesUserExist({ email: profile?.email! });
						if (response?.data === null) {
							const response = await registerUser({
								email: profile?.email!,
								firstName: profile?.given_name!,
								lastName: profile?.family_name!,
								profile: profile?.picture,
								provider: account?.provider!,
							});
						}
					} catch (error) {
						console.error('Error in JWT callback:', error);
						return token;
					}
				}
			}
			return token;
		},
		async session({ session }) {
			return session;
		},
	},
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
