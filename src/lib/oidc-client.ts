import { UserManager } from 'oidc-client-ts';

export const userManager = new UserManager({
	authority: 'http://localhost:8080/realms/futsal-realm', // Keycloak realm
	client_id: 'futsal-frontend', // Your Keycloak client
	redirect_uri: 'http://localhost:3000/callback', // Redirect after login
	response_type: 'code', // Authorization code flow (PKCE)
	scope: 'openid profile email',
	automaticSilentRenew: true, // auto token refresh
	silent_redirect_uri: 'http://localhost:3000/silent-renew',
});
