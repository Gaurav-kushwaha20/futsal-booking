import NextAuth from 'next-auth';
import KeycloakProvider from 'next-auth/providers/keycloak';
import { NextAuthOptions } from 'next-auth';

export const authOptions: NextAuthOptions = {
	providers: [
		KeycloakProvider({
			clientId: process.env.KEYCLOAK_CLIENT_ID!,
			clientSecret: process.env.KEYCLOAK_CLIENT_SECRET!,
			issuer: process.env.KEYCLOAK_ISSUER!,
			authorization: {
				params: {
					prompt: 'login',
				},
			},
		}),
	],
	callbacks: {
		async jwt({ token }) {
			console.log('token-------->', token);
			return token;
		},
		async session({ session, token }) {
			console.log('image--->', token?.picture);
			session.user = {
				name: token?.name,
				email: token?.email,
				image: token?.picture,
			};
			return session;
		},
	},
	session: { strategy: 'jwt' },
	secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
