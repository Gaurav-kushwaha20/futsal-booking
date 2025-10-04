interface KeycloakProfile {
	sub: string; // Keycloak user ID
	name: string; // Full name
	preferred_username: string; // Username
	given_name: string; // First name
	family_name: string; // Last name
	email: string; // Email
	email_verified: boolean; // Whether email is verified
}

export interface KeycloakUser {
	id_token: string;
	access_token: string;
	refresh_token: string;
	token_type: string; // usually "Bearer"
	scope: string; // usually "openid email profile"
	profile: KeycloakProfile;
	session_state: string;
	expires_at: number; // timestamp
}
