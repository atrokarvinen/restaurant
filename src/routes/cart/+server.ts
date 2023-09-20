import prisma from '$lib/server/prisma';
import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export const POST = async ({ request }) => {
	const payload = await request.json();
	console.log('payload:', payload);

	let cart = await prisma.cart.findFirst({ where: { id: payload.cartId } });
	if (!cart) {
		console.log('cart does not exist... creating new');
		cart = await prisma.cart.create({ data: {} });
		console.log('created cart:', cart);
	}

	const cartItem = await prisma.cartItem.create({
		data: {
			cartId: cart.id,
			quantity: payload.quantity,
			foodId: payload.food.id
		}
	});
	console.log('created cart item:', cartItem);

	return json(cartItem);
};

export const PUT = async ({ request }) => {
	const payload = await request.json();
	console.log('update payload:', payload);
	const { id, change } = payload;

	const isIncrement = change > 0;
	const abs = Math.abs(change);
	const updatedItem = await prisma.cartItem.update({
		data: {
			quantity: {
				decrement: isIncrement ? undefined : abs,
				increment: isIncrement ? abs : undefined
			}
		},
		where: { id },
		include: {
			food: true
		}
	});
	console.log('updated item:', updatedItem);

	return json(updatedItem);
};

export const DELETE = async () => {
	console.log('Deleting cart...');
	await prisma.cartItem.deleteMany();
	console.log('Cart deleted');
	return new Response();
};
