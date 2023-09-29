import prisma from '$lib/server/prisma.js';
import { fail } from '@sveltejs/kit';

export const load = async () => {
	const foods = await prisma.food.findMany({});
	return { foods };
};

export const actions = {
	delete: async ({ request }) => {
		const data = await request.formData();
		const id = Number(data.get('id'));

		try {
			const food = await prisma.food.findFirst({ where: { id } });
			if (!food) {
				return fail(400, { error: 'Food not found', success: false });
			}
			if (food.cannotBeDeleted) {
				return fail(400, {
					error: `Food '${food.name}' is a default food and cannot be deleted`,
					success: false
				});
			}

			const deletedFood = await prisma.food.delete({ where: { id } });
			console.log('deletedFood:', deletedFood);
			return { success: true, deletedFood };
		} catch (error) {
			return fail(400, { error: 'Failed to delete food', success: false });
		}
	}
};
