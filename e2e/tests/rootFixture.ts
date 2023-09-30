import { Page, test as base } from '@playwright/test';
import { baseUrl } from '../config';

type RootFixture = {
	page: Page;
};

export const test = base.extend<RootFixture>({
	page: async ({ page }, use) => {
		await page.goto(baseUrl);
		await use(page);
	}
});
