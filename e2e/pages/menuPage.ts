import { Page, expect } from '@playwright/test';

export class MenuPage {
	page: Page;

	constructor(page: Page) {
		this.page = page;
	}

	getFoodCard = (name: string) => this.page.getByRole('article').filter({ hasText: name });

	async goToPage() {
		await this.page.getByRole('link', { name: 'Home' }).click();
	}

	async addFoodToCart(name: string) {
		const item = this.getFoodCard(name);
		await item.getByTestId('add-to-cart').click();
	}

	async removeFoodFromCart(name: string) {
		const item = this.getFoodCard(name);
		await item.getByTestId('remove-from-cart').click();
	}

	async incrementFoodQuantity(name: string) {
		const item = this.getFoodCard(name);
		await item.getByTestId('increment').click();
	}

	async decrementFoodQuantity(name: string) {
		const item = this.getFoodCard(name);
		await item.getByTestId('decrement').click();
	}

	async expectDecrementButtonDisabled(name: string) {
		const item = this.getFoodCard(name);
		await expect(item.getByTestId('decrement')).toBeDisabled();
	}

	async expectCartCost(cost: number) {
		await expect(this.page.getByTestId('cart-icon-price')).toHaveText(`${cost.toFixed(2)} €`);
	}

	async expectNotLoggedInError() {
		await expect(this.page.getByText(/not logged in/i)).toBeVisible();
	}
}
