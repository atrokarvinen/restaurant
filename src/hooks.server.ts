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

export async function handleError({ error, event }) {
	const stackString = (error as any).stack.toString();
	const containsConnectionLimitError = stackString.includes('FATAL: too many connections for role');
	if (containsConnectionLimitError) {
		return {
			message:
				'There are currently too many active db connections. This is a test app with limited capacity. Please try again later.'
		};
	}
}
