import { Page, expect } from '@playwright/test';

export class CartPage {
	page: Page;

	constructor(page: Page) {
		this.page = page;
	}

	getFoodItem = (name: string) => this.page.getByRole('listitem').filter({ hasText: name });

	async goToPage() {
		await this.page.getByTestId('cart-icon').click();
	}

	async order() {
		await this.page.getByRole('button', { name: 'Order' }).click();
		await this.page.getByRole('button', { name: 'Confirm' }).click();
	}

	async removeFoodFromCart(name: string) {
		const item = this.getFoodItem(name);
		await item.getByTestId('remove-from-cart').click();
	}

	async incrementFoodQuantity(name: string) {
		const item = this.getFoodItem(name);
		await item.getByTestId('increment').click();
	}

	async decrementFoodQuantity(name: string) {
		const item = this.getFoodItem(name);
		await item.getByTestId('decrement').click();
	}

	async expectEmptyCart() {
		await expect(this.page.getByText('Cart is empty')).toBeVisible();
		await expect(this.page.getByRole('button', { name: 'Order' })).toBeDisabled();
	}

	async expectTotalCost(cost: number) {
		await expect(this.page.getByTestId('total-cost')).toContainText(cost.toString());
	}

	async expectItemCount(name: string, count: number) {
		await expect(this.getFoodItem(name)).toContainText(`(${count.toString()})`);
	}
}
