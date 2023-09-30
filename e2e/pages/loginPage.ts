import { Page, expect } from '@playwright/test';

export class LoginPage {
	page: Page;

	constructor(page: Page) {
		this.page = page;
	}

	async goToPage() {
		await this.page.getByRole('link', { name: /login/i }).click();
	}

	async login(username: string) {
		await this.page.getByLabel('username').selectOption(username);
		await this.page.getByRole('button', { name: 'Login' }).click();
	}

	async logout() {
		await this.page.getByRole('button', { name: 'Logout' }).click();
	}

	async expectUserNotLoggedIn() {
		await expect(this.page.getByRole('button', { name: 'Login' })).toBeVisible();
	}

	async expectUserLoggedIn(username: string) {
		const loginText = this.page.getByText(`Logged in as '${username}'`);
		await expect(loginText).toBeVisible();
		await expect(this.page.getByRole('button', { name: 'Logout' })).toBeVisible();
	}
}
