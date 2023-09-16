import { initialFoods } from '$lib/server/databaseSeed.js';
import prisma from '$lib/server/prisma';

export const load = async () => {
	console.log('Loading data from server');

	try {
		// await prisma.food.deleteMany({});
		const existingFoods = await prisma.food.findMany({});
		if (existingFoods.length === 0) {
			await prisma.food.createMany({ data: initialFoods });
		}
	} catch (error) {
		console.log('No connection to db');
		return { foodDtos: [], cartItems: [] };
	}
	const foods = await prisma.food.findMany({});
	const foodDtos = foods;

	const cartItems = await prisma.cartItem.findMany({ include: { food: true } });
	console.log('cartItems: ', cartItems);

	console.log('dto:', foodDtos);

	return { foodDtos, cartItems };
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
