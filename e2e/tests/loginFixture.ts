import { test as base } from '@playwright/test';
import { baseUrl } from '../config';
import { LoginPage } from '../pages/loginPage';

type LoginFixture = {
	loginPage: LoginPage;
};

export const test = base.extend<LoginFixture>({
	loginPage: async ({ page }, use) => {
		const loginPage = new LoginPage(page);
		await page.goto(baseUrl);
		await loginPage.goToPage();

		await use(loginPage);
	}
});
