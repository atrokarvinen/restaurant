import prisma from '$lib/server/prisma';
import { fail, redirect } from '@sveltejs/kit';

export const load = async ({ params }) => {
	console.log('[load] params:', params);
	const { foodId } = params;

	const food = await prisma.food.findUnique({ where: { id: +foodId } });

	return { food };
};

export const actions = {
	update: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id');
		const name = data.get('name');
		const price = data.get('price');
		const autofail = String(data.get('autofail'));

		let errors: { name?: string; price?: string } = {};
		if (!price) errors = { ...errors, price: 'Price is required' };
		if (!name) errors = { ...errors, name: 'Name is required' };
		if (errors.name || errors.price) {
			return fail(400, { errors });
		}

		if (autofail === 'on') return fail(400, { apiError: 'Request failed' });

		await prisma.food.update({
			data: {
				name: name!.toString(),
				price: +price!
			},
			where: { id: +id! }
		});

		throw redirect(300, '/admin');
	}
};
