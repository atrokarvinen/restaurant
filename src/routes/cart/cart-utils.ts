import type { Cart } from '../types';

export const calculateCartCost = (cart: Cart) => {
	const items = cart.items;
	const sum = items.reduce((prev, curr) => {
		return prev + curr.food?.price * curr.quantity;
	}, 0);
	return sum;
};
