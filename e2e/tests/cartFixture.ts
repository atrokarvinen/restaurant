import { baseUrl } from '../config';
import { CartPage } from '../pages/cartPage';
import { LoginPage } from '../pages/loginPage';
import { MenuPage } from '../pages/menuPage';
import { test as base } from './rootFixture';

type CartFixture = {
	cartPage: CartPage;
	loginPage: LoginPage;
	menuPage: MenuPage;
};

export const test = base.extend<CartFixture>({
	menuPage: async ({ page }, use) => {
		const menuPage = new MenuPage(page);
		await use(menuPage);
	},
	loginPage: async ({ page }, use) => {
		const loginPage = new LoginPage(page);
		await use(loginPage);
	},
	cartPage: async ({ page }, use) => {
		const cartPage = new CartPage(page);
		await page.request.post(`${baseUrl}/test`, { data: { name: 'Customer 1' } });
		await page.request.delete(`${baseUrl}/cart`);
		await page.reload();

		await use(cartPage);
	}
});
