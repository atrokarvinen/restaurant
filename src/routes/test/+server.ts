import prisma from '$lib/server/prisma.js';
import { fail } from '@sveltejs/kit';

export const POST = async ({ request, cookies }) => {
	console.log('env:', process.env.NODE_ENV);
	if (process.env.NODE_ENV !== 'development') {
		fail(400, { error: 'This route is only available for testing' });
	}

	const { name } = await request.json();
	const user = await prisma.user.findFirstOrThrow({ where: { name } });
	cookies.set('user', JSON.stringify(user));

	return new Response();
};
