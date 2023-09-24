import { getUser } from '$lib/auth.js';

export const load = async ({ cookies }) => {
	console.log('[layout] loading...');

	const user = getUser(cookies);

	return { user };
};
