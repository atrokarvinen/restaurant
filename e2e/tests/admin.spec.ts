import { test } from './adminFixture';

const name = 'test food';
const price = 33.1;

test('creates food', async ({ adminPage }) => {
	await adminPage.goToPage();
	await adminPage.expectFoodNotToBeVisible(name);
	await adminPage.addNewFood(name, price);
	await adminPage.expectFoodToBeVisible(name, price);
});

test('updates food', async ({ adminPage }) => {
	const updatedName = 'updated food';
	const updatedPrice = 18;

	await adminPage.goToPage();
	await adminPage.addNewFood(name, price);
	await adminPage.expectFoodToBeVisible(name, price);

	await adminPage.editFood(name, updatedName, updatedPrice);
	await adminPage.expectFoodNotToBeVisible(name);
	await adminPage.expectFoodToBeVisible(updatedName, updatedPrice);
});

test('deletes food', async ({ adminPage }) => {
	await adminPage.goToPage();
	await adminPage.addNewFood(name, price);
	await adminPage.expectFoodToBeVisible(name, price);
	await adminPage.deleteFood(name);
	await adminPage.expectFoodNotToBeVisible(name);
});

test('admin page only visible to admin user', async ({ adminPage, loginPage }) => {
	await loginPage.goToPage();
	await loginPage.logout();
	await adminPage.expectAdminPageNotVisible();
	await loginPage.login('Customer 1');
	await adminPage.expectAdminPageNotVisible();
	await loginPage.logout();
	await loginPage.login('Admin');
	await adminPage.expectAdminPageVisible();
});
