import { baseUrl } from '../config';
import { LoginPage } from '../pages/loginPage';
import { MenuPage } from '../pages/menuPage';
import { test as base } from './rootFixture';

type MenuFixture = {
	menuPage: MenuPage;
	loginPage: LoginPage;
};

export const test = base.extend<MenuFixture>({
	loginPage: async ({ page }, use) => {
		const loginPage = new LoginPage(page);
		await use(loginPage);
	},
	menuPage: async ({ page }, use) => {
		const menuPage = new MenuPage(page);
		await page.request.post(`${baseUrl}/test`, { data: { name: 'Customer 1' } });
		await page.request.delete(`${baseUrl}/cart`);
		await page.reload();
		await menuPage.goToPage();

		await use(menuPage);
	}
});
