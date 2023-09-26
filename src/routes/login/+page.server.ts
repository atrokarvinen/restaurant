import prisma from '$lib/server/prisma.js';
import { fail } from '@sveltejs/kit';
import type { User } from '../types.js';

export const load = async () => {
	const users = await prisma.user.findMany();
	return { users };
};

export const actions = {
	login: async ({ request, cookies }) => {
		console.log('logging in...');
		const data = await request.formData();
		console.log('data:', data);
		console.log('user:', data.get('user'));

		const userId = Number(data.get('user'));

		const user = await prisma.user.findFirst({ where: { id: userId } });
		if (!user) return fail(404, { error: 'User not found' });

		cookies.set('user', JSON.stringify(user));

		let cart = await prisma.cart.findUnique({
			where: { userId },
			include: { items: { include: { food: true } } }
		});
		if (!cart) {
			console.log('cart does not exist... creating new');
			cart = await prisma.cart.create({
				data: { userId },
				include: { items: { include: { food: true } } }
			});
			console.log('created cart:', cart);
		}

		console.log('logged in user "%s"', user.name);

		return { user, cart };
	},
	logout: async ({ cookies }) => {
		console.log('logging out...');

		const userCookie = cookies.get('user');
		console.log('userCookie:', userCookie);
		const user: User = JSON.parse(userCookie!);

		cookies.delete('user');

		console.log('logged out user "%s"', user.name);

		return { logoutSuccess: true };
	}
};
