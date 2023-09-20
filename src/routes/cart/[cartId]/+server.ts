import prisma from '$lib/server/prisma';

/** @type {import('./$types').RequestHandler} */
export const DELETE = async ({ params }) => {
	const { cartId } = params;
	console.log('params:', params);

	const deleted = await prisma.cart.delete({ where: { id: +cartId } });

	console.log('deleted:', deleted);

	return new Response();
};
