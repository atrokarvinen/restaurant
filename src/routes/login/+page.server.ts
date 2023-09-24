import { fail } from '@sveltejs/kit';
import type { User } from '../types.js';
import { users } from './users.js';

export const load = async () => {
	return { users };
};

export const actions = {
	login: async ({ request, cookies }) => {
		console.log('logging in...');
		const data = await request.formData();
		console.log('data:', data);
		console.log('user:', data.get('user'));

		const userId = Number(data.get('user'));

		const user = users.find((u) => u.id === userId);
		if (!user) return fail(404, { error: 'User not found' });

		cookies.set('user', JSON.stringify(user));

		console.log('logged in user "%s"', user.name);

		return { user };
	},
	logout: async ({ request, cookies }) => {
		console.log('logging out...');

		const userCookie = cookies.get('user');
		console.log('userCookie:', userCookie);
		const user: User = JSON.parse(userCookie!);

		cookies.delete('user');

		console.log('logged out user "%s"', user.name);

		return { logoutSuccess: true };
	}
};
