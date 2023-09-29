import type { Food, User } from '@prisma/client';
import { UserGroup } from '../../routes/types';
import prisma from './prisma';

export const initialFoods: Omit<Food, 'id'>[] = [
	{ name: 'Burger', price: 18.55, img: 'burger.jpg', cannotBeDeleted: true },
	{ name: 'Sallad', price: 8.1, img: 'sallad.jpg', cannotBeDeleted: true },
	{ name: 'Salmon', price: 27.95, img: 'salmon.jpg', cannotBeDeleted: true },
	{ name: 'Pizza', price: 17.5, img: 'pizza.jpg', cannotBeDeleted: true },
	{ name: 'Pasta', price: 11.8, img: 'pasta.jpg', cannotBeDeleted: true }
];

export const initialUsers: Omit<User, 'id'>[] = [
	{ groupId: UserGroup.ADMIN, name: 'Admin' },
	{ groupId: UserGroup.CUSTOMER, name: 'Customer 1' },
	{ groupId: UserGroup.CUSTOMER, name: 'Customer 2' }
];

export const seedDatabase = async () => {
	const existingFoods = await prisma.food.findMany({});
	if (existingFoods.length === 0) {
		await prisma.food.createMany({ data: initialFoods });
	}

	const existingUsers = await prisma.user.findMany();
	if (existingUsers.length === 0) {
		await prisma.user.createMany({ data: initialUsers });
	}
};
