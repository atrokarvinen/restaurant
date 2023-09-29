import { getUserId } from '$lib/auth';

export async function handle({ event, resolve }) {
	if (event.url.pathname.startsWith('/cart')) {
		const userId = getUserId(event.cookies);
		if (!userId) {
			return new Response('Operation failed, user not logged in.', { status: 403 });
		}
		event.locals.userId = userId as any;
	}

	const response = await resolve(event);
	return response;
}
