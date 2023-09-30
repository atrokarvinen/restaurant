import { test } from './loginFixture';

test('logs in', async ({ loginPage }) => {
	const username = 'Customer 1';
	await loginPage.expectUserNotLoggedIn();

	await loginPage.login(username);

	await loginPage.expectUserLoggedIn(username);
});

test('logs out', async ({ loginPage }) => {
	const username = 'Customer 1';
	await loginPage.login(username);

	await loginPage.expectUserLoggedIn(username);

	await loginPage.logout();

	await loginPage.expectUserNotLoggedIn();
});
