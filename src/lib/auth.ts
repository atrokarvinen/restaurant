import type { Cookies } from '@sveltejs/kit';
import type { User } from '../routes/types';

export const getUser = (cookies: Cookies) => {
	const userToken = cookies.get('user');
	if (!userToken) return undefined;
	const user: User = JSON.parse(userToken);
	return user;
};

export const getUserId = (cookies: Cookies) => {
	return getUser(cookies)?.id;
};
