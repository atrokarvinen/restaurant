import prisma from '$lib/server/prisma';

/** @type {import('./$types').RequestHandler} */
export const DELETE = async ({ params }) => {
	const { itemId } = params;
	console.log('params:', params);

	const deleted = await prisma.cartItem.delete({
		where: { id: +itemId }
	});

	console.log('deleted:', deleted);

	return new Response();
};
