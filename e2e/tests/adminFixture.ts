import { baseUrl } from '../config';
import { AdminPage } from '../pages/adminPage';
import { LoginPage } from '../pages/loginPage';
import { test as base } from './rootFixture';

type AdminFixture = {
	adminPage: AdminPage;
	loginPage: LoginPage;
	foodName: string;
	updatedFoodName: string;
};

export const test = base.extend<AdminFixture>({
	foodName: 'test food',
	updatedFoodName: 'updated food',
	loginPage: async ({ page }, use) => {
		const loginPage = new LoginPage(page);
		await use(loginPage);
	},
	adminPage: async ({ page, foodName, updatedFoodName }, use) => {
		const adminPage = new AdminPage(page);
		await page.request.post(`${baseUrl}/test`, { data: { name: 'Admin' } });
		await page.request.delete(`${baseUrl}/test/${foodName}`);
		await page.request.delete(`${baseUrl}/test/${updatedFoodName}`);
		await page.reload();
		await adminPage.goToPage();

		await use(adminPage);
	}
});
