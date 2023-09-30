import prisma from '$lib/server/prisma.js';
import { fail } from '@sveltejs/kit';

export const DELETE = async ({ params }) => {
	const { name } = params;

	if (process.env.NODE_ENV !== 'development') {
		fail(400, { error: 'This route is only available for testing' });
	}

	await prisma.food.deleteMany({ where: { name } });

	return new Response();
};
