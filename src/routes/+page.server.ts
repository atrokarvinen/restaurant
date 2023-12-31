import { seedDatabase } from '$lib/server/databaseSeed.js';
import prisma from '$lib/server/prisma';

export const load = async ({ locals }) => {
	try {
		await seedDatabase();
	} catch (error) {
		console.log('No connection to db:', error);
		return { foodDtos: [], cartItems: [] };
	}
	const foods = await prisma.food.findMany({});
	const foodDtos = foods;

	// console.log('dto:', foodDtos);

	return { foodDtos };
};

/** @type {import('./$types').Actions} */
export const actions = {
	order: async ({ request }) => {
		const data = await request.formData();
		console.log('Ordering...');

		const json = Object.fromEntries(data.entries());
		console.log('json:', json);

		const items = data.getAll('id');
		const quantities = data.getAll('quantity');

		console.log('items:', items);
		console.log('quantities:', quantities);

		return {};
	}
};
