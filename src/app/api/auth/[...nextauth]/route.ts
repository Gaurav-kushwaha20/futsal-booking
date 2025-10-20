import { doesUserExist, registerUser } from '@/service/user';
import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
	],
	session: { strategy: 'jwt' },
	secret: process.env.NEXTAUTH_SECRET,
	callbacks: {
		async jwt({ token, profile }) {
			// console.log(account); // provider, type, provider account id, access_token, expires_at, scope, token_type, id_token
			// console.log(token); // name, email, picture, sub
			// console.log(user); // id, name, email, image
			// console.log(profile) // iss, azp, aud, sub, email, email_verified, at_hash, name, picture, given_name, family_name, iat, exp
			console.log(profile);
			if (profile) {
				const response = await doesUserExist({ email: profile?.email! });
				if (response?.data === null) {
					// Create new user to db
					const response = await registerUser({ email: profile.email! });
				}
			}

			return token;
		},
		async session({ session, token }) {
			session.user = {
				...session.user,
			};
			return session;
		},
	},
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
