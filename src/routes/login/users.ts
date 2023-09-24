import { UserGroup, type User } from '../types';

export const users: User[] = [
	{ id: 1, group: UserGroup.ADMIN, name: 'Admin' },
	{ id: 2, group: UserGroup.CUSTOMER, name: 'Customer 1' },
	{ id: 3, group: UserGroup.CUSTOMER, name: 'Customer 2' }
];
