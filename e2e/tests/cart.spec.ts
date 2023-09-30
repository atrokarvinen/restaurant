import { test } from './cartFixture';

test('orders cart', async ({ menuPage, cartPage }) => {
	await cartPage.goToPage();
	await cartPage.expectEmptyCart();

	await menuPage.goToPage();
	await menuPage.addFoodToCart('Burger');
	await menuPage.addFoodToCart('Salmon');

	await cartPage.goToPage();
	await cartPage.expectItemCount('Burger', 1);
	await cartPage.expectItemCount('Salmon', 1);
	await cartPage.expectTotalCost(46.5);

	await cartPage.order();
	await cartPage.expectEmptyCart();
});

test('increments, decrements and removes item from cart', async ({ menuPage, cartPage }) => {
	await menuPage.goToPage();
	await menuPage.addFoodToCart('Burger');
	await menuPage.addFoodToCart('Salmon');

	await cartPage.goToPage();
	await cartPage.expectItemCount('Burger', 1);
	await cartPage.expectTotalCost(46.5);

	await cartPage.incrementFoodQuantity('Burger');
	await cartPage.expectItemCount('Burger', 2);

	await cartPage.decrementFoodQuantity('Burger');
	await cartPage.expectItemCount('Burger', 1);

	await cartPage.removeFoodFromCart('Burger');
	await cartPage.expectItemCount('Salmon', 1);
	await cartPage.expectTotalCost(27.95);
});
