// auth.ts
import NextAuth from 'next-auth';
import KeycloakProvider from 'next-auth/providers/keycloak';

export const { handlers, auth, signIn, signOut } = NextAuth({
	providers: [
		KeycloakProvider({
			clientId: process.env.KEYCLOAK_CLIENT_ID!,
			clientSecret: process.env.KEYCLOAK_CLIENT_SECRET!,
			issuer: process.env.KEYCLOAK_ISSUER,
			authorization: {
				params: {
					scope: 'openid email profile',
				},
			},
		}),
	],
	callbacks: {
		async jwt({ token, account, profile }) {
			// Persist OAuth access_token to the token right after signin
			if (account) {
				token.accessToken = account.access_token;
				token.refreshToken = account.refresh_token;
				token.idToken = account.id_token;
				token.expiresAt = account.expires_at;
			}

			// Return previous token if the access token has not expired yet
			if (Date.now() < (token.expiresAt as number) * 1000) {
				return token;
			}

			// Access token has expired, try to update it
			return await refreshAccessToken(token);
		},
		async session({ session, token }) {
			// session.accessToken = token.accessToken as string;
			// session.refreshToken = token.refreshToken as string;
			// session.idToken = token.idToken as string;
			// session.error = token.error as string;
			// session.user = token.user as any;

			return session;
		},
	},
	events: {
		async signOut({ token }) {
			// Keycloak logout
			try {
				const issuerUrl = process.env.KEYCLOAK_ISSUER;
				if (issuerUrl && token.idToken) {
					const logOutUrl = new URL(`${issuerUrl}/protocol/openid-connect/logout`);
					logOutUrl.searchParams.set('id_token_hint', token.idToken as string);
					await fetch(logOutUrl.toString());
				}
			} catch (error) {
				console.error('Keycloak logout error:', error);
			}
		},
	},
});

async function refreshAccessToken(token: any) {
	try {
		const response = await fetch(`${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/token`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: new URLSearchParams({
				client_id: process.env.KEYCLOAK_CLIENT_ID!,
				client_secret: process.env.KEYCLOAK_CLIENT_SECRET!,
				grant_type: 'refresh_token',
				refresh_token: token.refreshToken as string,
			}),
		});

		const refreshedTokens = await response.json();

		if (!response.ok) {
			throw refreshedTokens;
		}

		return {
			...token,
			accessToken: refreshedTokens.access_token,
			accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
			refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
			idToken: refreshedTokens.id_token ?? token.idToken,
		};
	} catch (error) {
		console.error('Error refreshing access token:', error);
		return {
			...token,
			error: 'RefreshAccessTokenError',
		};
	}
}
