import { test } from './menuFixture';

test('adds and removes food to cart', async ({ menuPage }) => {
	await menuPage.expectCartCost(0);
	await menuPage.addFoodToCart('Burger');
	await menuPage.expectCartCost(18.55);

	await menuPage.removeFoodFromCart('Burger');
	await menuPage.expectCartCost(0);
});

test('incements and decrements food quantity', async ({ menuPage }) => {
	await menuPage.addFoodToCart('Burger');
	await menuPage.expectCartCost(18.55);

	await menuPage.incrementFoodQuantity('Burger');
	await menuPage.expectCartCost(2 * 18.55);

	await menuPage.decrementFoodQuantity('Burger');
	await menuPage.expectCartCost(18.55);

	await menuPage.decrementFoodQuantity('Burger');
	await menuPage.expectCartCost(0);
	await menuPage.expectDecrementButtonDisabled('Burger');
});

test('cannot add food when not logged in', async ({ menuPage, loginPage }) => {
	await loginPage.goToPage();
	await loginPage.logout();

	await menuPage.goToPage();
	await menuPage.addFoodToCart('Burger');
	await menuPage.expectNotLoggedInError();
	await menuPage.expectCartCost(0);
});
