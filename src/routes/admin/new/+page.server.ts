import prisma from '$lib/server/prisma';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
	create: async ({ request }) => {
		const data = await request.formData();

		const json = Object.fromEntries(data.entries());
		console.log('json:', json);

		const name = data.get('name');
		const price = data.get('price');
		const autofail = String(data.get('autofail'));

		let errors: { name?: string; price?: string } = {};
		if (!price) errors = { ...errors, price: 'Price is required' };
		if (!name) errors = { ...errors, name: 'Name is required' };
		if (name && name.length > 50)
			errors = { ...errors, name: 'Name must be shorter than 50 characters' };
		if (errors.name || errors.price) {
			return fail(400, { errors });
		}

		if (autofail === 'on') return fail(400, { apiError: 'Request failed' });

		const existingFoodCount = (await prisma.food.findMany()).length;
		if (existingFoodCount > 20) return fail(400, { apiError: 'Cannot create more than 20 foods' });

		const foodToCreate = { name: name!.toString(), price: price ? +price : 0 };
		console.log('foodToCreate:', foodToCreate);

		const createdFood = await prisma.food.create({
			data: {
				img: 'generic-food.jpg',
				name: foodToCreate.name,
				price: foodToCreate.price
			}
		});
		throw redirect(300, '/admin');
	}
};
