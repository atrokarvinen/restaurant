import type { Food } from '@prisma/client';

export const initialFoods: Omit<Food, 'id'>[] = [
	{ name: 'Burger', price: 18.55, img: 'burger.jpg' },
	{ name: 'Sallad', price: 8.1, img: 'sallad.jpg' },
	{ name: 'Salmon', price: 27.95, img: 'salmon.jpg' },
	{ name: 'Pizza', price: 17.5, img: 'pizza.jpg' },
	{ name: 'Pasta', price: 11.8, img: 'pasta.jpg' }
];
