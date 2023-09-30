import { Page, expect } from '@playwright/test';

export class AdminPage {
	page: Page;

	constructor(page: Page) {
		this.page = page;
	}

	getAdminPage = () => this.page.getByRole('link', { name: 'Admin' });
	getFood = (name: string) => this.page.getByRole('listitem').filter({ hasText: name });

	async goToPage() {
		await this.getAdminPage().click();
	}

	async addNewFood(name: string, price: number) {
		await this.page.getByRole('link', { name: 'Add new' }).click();
		await this.page.getByLabel('Name').fill(name);
		await this.page.getByLabel('Price').fill(price.toString());
		await this.page.getByRole('button', { name: 'Create' }).click();
	}

	async editFood(originalName: string, updatedName: string, price: number) {
		await this.getFood(originalName).getByTestId('edit-food').click();
		await this.page.getByLabel('Name').fill(updatedName);
		await this.page.getByLabel('Price').fill(price.toString());
		await this.page.getByRole('button', { name: 'Update' }).click();
	}

	async deleteFood(name: string) {
		await this.getFood(name).getByTestId('delete-food').click();
	}

	async expectFoodToBeVisible(name: string, price: number) {
		await expect(this.getFood(name)).toBeVisible();
		await expect(this.getFood(name)).toContainText(price.toString());
	}

	async expectFoodNotToBeVisible(name: string) {
		await expect(this.getFood(name)).not.toBeVisible();
	}

	async expectAdminPageVisible() {
		await expect(this.getAdminPage()).toBeVisible();
	}

	async expectAdminPageNotVisible() {
		await expect(this.getAdminPage()).not.toBeVisible();
	}
}
