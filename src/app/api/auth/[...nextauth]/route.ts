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
		async jwt({ token, account }) {
			console.log('token-------->', token);

			// first login
			if (account) {
				token.access_token = account.access_token;
				token.refresh_token = account.refresh_token;
				token.id_token = account.id_token;
				token.expires_at = Number(Math.floor(Date.now() / 1000 + account?.expires_at!));
			}

			// refresh if expired
			if (Date.now() / 1000 > token?.expires_at) {
				try {
					const response = await fetch(`${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/token`, {
						method: 'POST',
						headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
						body: new URLSearchParams({
							client_id: process.env.KEYCLOAK_CLIENT_ID!,
							client_secret: process.env.KEYCLOAK_CLIENT_SECRET!,
							grant_type: 'refresh_token',
							refresh_token: token.refresh_token as string,
						}),
					});
					const refreshed = await response.json();

					token.access_token = refreshed.access_token;
					token.refresh_token = refreshed.refresh_token ?? token.refresh_token;
					token.expires_at = Math.floor(Date.now() / 1000 + refreshed.expires_in);
				} catch (err) {
					console.error('Error refreshing Keycloak token', err);
					return null; // user must re-login
				}
			}
			return token;
		},
		async session({ session, token }) {
			session.user = {
				...session.user,
				access_token: token.access_token,
				refresh_token: token.refresh_token,
				id_token: token.id_token,
			};
			return session;
			return session;
		},
	},
	session: { strategy: 'jwt' },
	secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
