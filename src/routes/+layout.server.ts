import { getUser } from '$lib/auth.js';
import prisma from '$lib/server/prisma.js';

export const load = async ({ cookies }) => {
	const user = getUser(cookies);
	const cart = user
		? await prisma.cart.findFirst({
				where: { userId: user.id },
				include: { items: { include: { food: true } } }
		  })
		: undefined;
	return { user, cart };
};
