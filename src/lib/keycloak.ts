import Keycloak from 'keycloak-js';

let keycloak: Keycloak | null = null;

export const initKeycloak = (): Promise<Keycloak> => {
	if (!keycloak) {
		keycloak = new Keycloak({
			url: 'http://localhost:8080/',
			realm: 'futsal-realm',
			clientId: 'futsal-frontend',
		});
	}

	return new Promise((resolve, reject) => {
		keycloak!
			.init({ onLoad: 'check-sso', pkceMethod: 'S256' })
			.then((authenticated) => {
				if (authenticated) {
					resolve(keycloak!);
				} else {
					resolve(keycloak!); // still resolve so you can call login()
				}
			})
			.catch((err) => reject(err));
	});
};
